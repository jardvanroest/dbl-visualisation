import * as d3 from "d3";
//import * as Math from "core-js/fn/math";

export class CalendarYear {
  constructor(svg, data) {
    this.widthYear = 1000;
    this.cellSize = 17;
    this.heightYear = 17 * 9;
    this.calendarYear = this._createYearObject(svg, data);

    this.timeWeek = d3.utcMonday;
    this.countDay = (i) => (i + 6) % 7;
    this.formatDay = (i) => "SMTWTFS"[i];
    this.formatMonth = d3.utcFormat("%b");
  }

  getData() {
    return 0; //this.parsedData;
  }
  _generateVisualisation() {
    this._generateText();
    this._generateDays();
  }
  _generateDays() {
    const vm = this;
    this.calendarYear
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
  }

  _generateText() {
    this.__generateKeyYearsText();
    this.__generateKeyDaysText();
    this.__generateKeyMonthsText();
  }
  __generateKeyYearsText() {
    this.calendarYear
      .append("text")
      .attr("x", -5)
      .attr("y", -5)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .text(([key]) => key);
  }

  __generateKeyDaysText() {
    this.calendarYear
      .append("g")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(d3.range(7))
      .join("text")
      .attr("x", -5)
      .attr("y", (i) => (this.countDay(i) + 0.5) * this.cellSize)
      .attr("dy", "0.31em")
      .text(this.formatDay);
  }

  __generateKeyMonthsText() {
    this.calendarYear
      .append("g")
      .selectAll("g")
      .data(() => d3.utcMonths(new Date("1-1-2000"), new Date("12-12-2000")))
      .join("g")
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
      })
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
  }

  _createYearObject(svg, data) {
    return svg
      .selectAll("g")
      .data(this._groupData(data))
      .join("g")
      .attr(
        "transform",
        (d, i) => `translate(40.5,${this.heightYear * i + this.cellSize * 1.5})`
      );
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

  _createCellDate(date, emails) {
    const cell = new CellDate(date, emails);
    return cell;
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
}

class CellDate {
  constructor(date, emails) {
    this.date = date;
    this.emails = emails;
  }

  get fillColor() {
    // dif type of vis
    // return (
    //   "rgb(" + number * 1.5 + ", " + number * 0.8 + "," + number * 0.5 + ")"
    // );
    return (
      "rgb(" +
      this.weight / 0.5 +
      ", " +
      /*this.weight / 1.4 */ 98 +
      "," +
      /*this.weight / 5 */ 98 +
      ")"
    );
  }
  get avgSentiment() {
    return (
      this.emails.reduce((a, b) => a.sentiment + b.sentiment, 0) /
      this.emails.length
    );
  }
  get weight() {
    return this.emails.length;
  }
}
