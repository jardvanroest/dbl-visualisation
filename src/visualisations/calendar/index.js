import { Visualisation } from "@/visualisations/visualisation.js";
import { CalendarYear } from "@/visualisations/calendar/calendarYear.js";
import store from "@/store";
import * as d3 from "d3";
import * as logic from "../../logic/componentsLogic";

export class CalendarVisualisation extends Visualisation {
  constructor(HTMLSelector, tooltipsUpdate, colorMode) {
    super(HTMLSelector);
    this.updateTooltips = tooltipsUpdate;
    this.coloringMode = colorMode;
    this.width = 500;
    this.height = 500;
    this.cellSize = this.width * 0.017;
    this.widthYear = this.width / 1.2;
    this.heightYear = this.cellSize * 12;
    this.fontSize = this.width / 60;

    this.timeWeek = d3.utcMonday;
    this.countDay = (i) => (i + 6) % 7;
    this.formatDay = (i) => "SMTWTFS"[i];
    this.formatMonth = d3.utcFormat("%b");

    this.weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  redraw(data) {
    this.resetVisualisation();
    const calendarData = new CalendarYear(data);
    this._generateVisualisation(calendarData._getData());
  }

  _generateVisualisation(parsedData) {
    const svg = this._getSVG();
    const year = this._generateYear(svg, parsedData);

    this._drawDateCells(year);
    this._generateLabels(year);
  }
  _generateYear(svg, data) {
    return svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d, i) => this._transformYear(i));
  }
  _transformYear(i) {
    const trX = 40.5;
    const trY = this.heightYear * i + this.cellSize * 1.5;
    return `translate(${trX},${trY})`;
  }

  _generateLabels(year) {
    this.__generateText_KeyYears(year);
    this.__generateText_KeyDays(year, d3.range(7));
    this.__generateText_KeyMonths(year, d3.utcMonths());
  }

  __generateText_KeyYears(year) {
    year
      .append("text")
      .attr("x", -5)
      .attr("y", -5)
      .attr("font-size", this.fontSize)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .text(([key]) => key);
  }
  __generateText_KeyDays(year, range) {
    year
      .append("g")
      .attr("text-anchor", "end")
      .attr("font-size", this.fontSize)
      .selectAll("text")
      .data(range)
      .join("text")
      .attr("x", -5)
      .attr("y", (i) => (this.countDay(i) + 0.5) * this.cellSize)
      .attr("dy", "0.31em")
      .text(this.formatDay);
  }

  __generateText_KeyMonths(year, range) {
    const month = this.__getText_KeyMonths(year, range);
    month
      .filter((d, i) => i)
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2.5)
      .attr("d", (t) => this.___mapMonths(t));
    month
      .append("text")
      .attr("font-size", this.fontSize)
      .attr("x", (d) => this.___getXposMonth(d))
      .attr("y", -5)
      .text(this.formatMonth);
  }
  ___getXposMonth(d) {
    return (
      this.timeWeek.count(d3.utcYear(d), this.timeWeek.ceil(d)) *
        this.cellSize +
      2
    );
  }
  ___getXposCellDate(d) {
    return d3.utcMonday.count(d3.utcYear(d.date), d.date) * this.cellSize + 0.5;
  }
  ___getYposCellDate(d) {
    return this.countDay(d.date.getUTCDay()) * this.cellSize + 0.5;
  }
  ___mapMonths(t) {
    const n = 7;
    const d = Math.max(0, Math.min(n, this.countDay(t.getUTCDay())));
    const w = this.timeWeek.count(d3.utcYear(t), t);
    return `${
      d === 0
        ? `M${w * this.cellSize},0`
        : d === n
        ? `M${(w + 1) * this.cellSize},0`
        : `M${(w + 1) * this.cellSize},0V${d * this.cellSize}H${
            w * this.cellSize
          }`
    }V${n * this.cellSize}`;
  }

  __getText_KeyMonths(year) {
    return year
      .append("g")
      .selectAll("g")
      .data((d) =>
        d3.utcMonths(new Date("1-1-" + d[0]), new Date("12-12-" + d[0]))
      )
      .join("g");
  }

  _drawDateCells(year) {
    const vm = this;
    year
      .append("g")
      .selectAll("rect")
      .data(([, values]) => values)
      .join("rect")
      .attr("width", this.cellSize - 1)
      .attr("height", this.cellSize - 1)
      .attr("x", (d) => this.___getXposCellDate(d))
      .attr("y", (d) => this.___getYposCellDate(d))
      // coloring and opacity
      .attr("fill", (d) => this.___getColoringMode(d))
      .attr("fill-opacity", (d) =>
        this.coloringMode === "byEmails" ? d.opacity : 1
      )
      .attr("stroke-opacity", "1.0")
      .on("click", (e, d) => {
        vm.updateInspectorData(e, d);
      })
      .on("mousemove", (e, d) => {
        vm.updateTooltips(this._dataTooltip(true, e, d));
      })
      .on("mouseout", (e) => {
        vm.updateTooltips(this._dataTooltip(false));
      });
  }

  _dataTooltip(v, e, d) {
    if (v)
      return {
        visible: v,
        pos: this.__positionTooltip(e),
        data: this.__tooltipContent(d),
      };
    return { visible: v };
  }
  __tooltipContent(d) {
    return {
      date: this.___parseDate(d.date),
      emails: d.weight,
      sentiment: d.avgSentiment,
    };
  }
  ___parseDate(date) {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
  __positionTooltip(e) {
    return {
      top: this.___styleTop(e.layerY),
      left: this.___styleLeft(e.layerX),
    };
  }
  ___styleTop(layerY) {
    if (layerY > 80) return layerY - 80;
    return layerY + 30;
  }
  ___styleLeft(layerX) {
    if (layerX > 150) return layerX - 150;
    return layerX + 30;
  }
  ___getColoringMode(d) {
    const mode = this.coloringMode(); //store.getters["coloring/coloringMode"];
    if (mode == "byEmails") return d.fillColor_ByEmails;
    return d.fillColor_BySentiment;
  }
  updateInspectorData(event, cellData) {
    this._changeInspectedElement(event.target);

    let inspectorData = {};
    let _date = cellData.date;

    inspectorData.date = {
      weekday: this.weekdayNames[_date.getDay()],
      day_of_month: _date.getDate(),
      month: this.monthNames[_date.getMonth()],
      year: _date.getFullYear(),
    };
    inspectorData.emails = { number: cellData.emails.length };

    this._newEmailsObject(cellData.emails, inspectorData.emails);
    delete inspectorData.emails.Date;

    inspectorData.additional_information = {
      color: logic._RGBToHex(this.___getColoringMode(cellData)),
      opacity: Math.min(cellData.opacity.toPrecision(3), 1),
    };
    console.log(logic._RGBToHex(this.___getColoringMode(cellData)));

    store.dispatch("dataset/changeInspectorData", inspectorData);
  }
}
