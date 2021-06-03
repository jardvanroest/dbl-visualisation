import * as d3 from "d3";

export class CalendarYear {
  constructor(data) {
    this.parsedData = this._parseData(data);
  }

  _getData() {
    return this.parsedData;
  }

  _parseData(data) {
    return this._groupData(data);
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
      let exist = this._objExist(returnObj, arrDates[i]);
      if (exist) {
        try {
          this._findObjByDate(returnObj, arrDates[i]).emails.push(arrDates[i]);
        } catch (e) {
          console.log(arrDates[i].date.getDay());
        }
      } else {
        returnObj.push(this._createCellDate(arrDates[i].date, [arrDates[i]]));
      }
    }
    return returnObj;
  }
  _findObjByDate(arr, comparisonObj) {
    return arr.find((e) => e.date.getTime() == comparisonObj.date.getTime());
  }
  _objExist(arr, comparisonObj) {
    return arr.some((e) => e.date.getTime() == comparisonObj.date.getTime());
  }
  _createCellDate(date, emails) {
    const cell = new CellDate(date, emails);
    return cell;
  }
}

class CellDate {
  constructor(date, emails) {
    this.date = date;
    this.emails = emails;
  }
  get opacity() {
    return this.weight / 7;
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
