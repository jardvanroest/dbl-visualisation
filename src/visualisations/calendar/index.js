import { Visualisation } from "@/visualisations/visualisation.js";
import { CalendarYear } from "@/visualisations/calendar/calendarYear.js";
import * as d3 from "d3";

export class CalendarVisualisation extends Visualisation {
  constructor(changeInspectorData) {
    super("#area_calendar");
    this.changeInspectorData = changeInspectorData;

    this.width = 1200;
    this.widthYear = 1000;
    this.cellSize = 17;
    this.heightYear = this.cellSize * 9;
    this.height = 1300;

    this.timeWeek = d3.utcMonday;
    this.countDay = (i) => (i + 6) % 7;
    this.formatDay = (i) => "SMTWTFS"[i];
    this.formatMonth = d3.utcFormat("%b");
  }

  redraw(data) {
    //this.parsedData = this._groupData(data); // grouped
    this._resetVisualisation();
    const cal = new CalendarYear(this._getSVG(), data);
    cal._generateVisualisation();
    //cal._generateVisualisation();
    //this._generateVisualisation(this.parsedData);
  }

  _generateVisualisation(parsedData) {
    const vm = this;
    const svg = this._getSVG();
    const year = svg
      .selectAll("g")
      .data(parsedData)
      .join("g")
      .attr(
        "transform",
        (d, i) => `translate(40.5,${this.heightYear * i + this.cellSize * 1.5})`
      );
    // years text
    year
      .append("text")
      .attr("x", -5)
      .attr("y", -5)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .text(([key]) => key);
    // days text
    year
      .append("g")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(d3.range(7))
      .join("text")
      .attr("x", -5)
      .attr("y", (i) => (this.countDay(i) + 0.5) * this.cellSize)
      .attr("dy", "0.31em")
      .text(this.formatDay);
    // data
    year
      .append("g")
      .selectAll("rect")
      .data(([, values]) => values)
      .join("rect")
      .attr("width", this.cellSize - 1)
      .attr("height", this.cellSize - 1)
      .attr(
        "x",
        (d) =>
          d3.utcMonday.count(d3.utcYear(d.date), d.date) * this.cellSize + 0.5
      )
      .attr("y", (d) => this.countDay(d.date.getUTCDay()) * this.cellSize + 0.5)
      .attr("fill", (d) => this.color(d.emails.length))
      .attr("opacity", (d) => d.emails.length / 5)
      .on("click", (e, d) => {
        console.log(d);
        vm.changeInspetorData(d);
      })
      .text((d) => d.emails.length);
    // moth text
    const month = year
      .append("g")
      .selectAll("g")
      .data(() => d3.utcMonths(new Date("1-1-2000"), new Date("12-12-2000")))
      .join("g");

    month
      .filter((d, i) => i)
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("d", (t) => {
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
      });

    month
      .append("text")
      .attr(
        "x",
        (d) =>
          this.timeWeek.count(d3.utcYear(d), this.timeWeek.ceil(d)) *
            this.cellSize +
          2
      )
      .attr("y", -5)
      .text(this.formatMonth);
    //this._drawVisualisation(svg, year);
  }

  _getMonths() {}

  _getYears() {}

  _drawVisualisation(svg, matrix) {
    this.rectLength = this.options.widthYear / (this.persons.length + 2);
    this.rectMargin = this.rectLength * 0.06;

    const drawnRows = this._drawRows(svg, matrix);
    const drawnCells = this._drawCells(drawnRows);
    drawnCells;
  }

  _drawRows(svg, matrix) {
    return svg
      .selectAll("g")
      .data(matrix)
      .enter()
      .append("g")
      .attr("transform", this._getRowTranslation.bind(this));
  }
  _getHight() {}
  _getRowTranslation(_, i) {
    const y = this._getPositionFromIndex(_, i);
    return `translate(0, ${y})`;
  }

  _drawCells(rows) {
    return rows
      .selectAll("g")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("g")
      .append("rect")
      .attr("x", this._getPositionFromIndex.bind(this))
      .attr("width", this.rectLength)
      .attr("height", this.rectLength)
      .attr("fill", function (d) {
        return d.fillColor;
      });
  }
  _groupData(set) {
    let group = d3.groups(set, (d) => d.date.getUTCFullYear()).sort();
    for (let i = 0; i < group.length; i++) {
      group[i][1] = this.__parseDates(group[i][1]);
    }
    return group;
  }

  __parseDates(arrDates) {
    let returnObj = [];
    for (let i = 0; i < arrDates.length; i++) {
      let exist = returnObj.some(
        (e) => e.date.getTime() == arrDates[i].date.getTime()
      );
      if (exist) {
        try {
          returnObj
            .find((e) => e.date.getTime() == arrDates[i].date.getTime())
            .emails.push(arrDates[i]);
        } catch (e) {
          console.log(arrDates[i].date.getDay());
        }
      } else {
        returnObj.push({
          date: arrDates[i].date,
          emails: [arrDates[i]],
        });
      }
    }
    return returnObj;
  }
  color(number) {
    // dif type of vis
    // return (
    //   "rgb(" + number * 1.5 + ", " + number * 0.8 + "," + number * 0.5 + ")"
    // );
    return (
      "rgb(" +
      number / 0.5 +
      ", " +
      /*number / 1.4 */ 98 +
      "," +
      /*number / 5 */ 98 +
      ")"
    );
  }
  pathMonth(t, cellSize, timeWeek, countDay) {
    const d = Math.max(0, Math.min(7, countDay(t.getUTCDay())));
    const w = timeWeek.count(d3.utcYear(t), t);
    return `${
      d === 0
        ? `M${w * cellSize},0`
        : d === 7
        ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
    }V${7 * cellSize}`;
  }
  _getPositionFromIndex(d, i) {
    const position = (this.rectLength + this.rectMargin) * i;
    return position;
  }
}
