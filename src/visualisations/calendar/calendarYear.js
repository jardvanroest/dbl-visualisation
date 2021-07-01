import * as d3 from "d3";
import store from "@/store";
import * as logic from "../../logic/componentsLogic";
import getters from "../../store/modules/coloring/getters";

export class CalendarYear {
  constructor(data) {
    this.parsedData = this._parseData(data);
  }

  _getData() {
    this._updateMaxEmailsDay();
    return this.parsedData;
  }

  _parseData(set) {
    store.dispatch("dataset/updateCalculationVariables", set);
    let group = d3.groups(set, (d) => d.date.getUTCFullYear()).sort();
    for (let i = 0; i < group.length; i++) {
      group[i][1] = this.__parseDates(group[i][1]);
    }
    return group;
  }
  _updateMaxEmailsDay() {
    let max = 0;
    for (let i = 0; i < this.parsedData.length; i++) {
      for (let j = 0; j < this.parsedData[i][1].length; j++) {
        if (this.parsedData[i][1][j].weight > max)
          max = this.parsedData[i][1][j].weight;
      }
    }
    store.dispatch("dataset/updateMaxEmailsDay", max);
  }

  __parseDates(arrDates) {
    let returnObj = [];
    for (let i = 0; i < arrDates.length; i++) {
      let exist = this._objExist(returnObj, arrDates[i]);
      if (exist) {
        try {
          this._findObjByDate(returnObj, arrDates[i]).emails.push(arrDates[i]);
        } catch (e) {
          console.log(
            "There was an error while parsing the dates in Calendar: date:" +
              arrDates[i].date.getTime()
          );
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
    return this.weight / (store.getters["dataset/maxEmailsDay"] / 20);
  }
  get opacity_BySentiment() {
    return this.weight / (store.getters["dataset/maxEmailsDay"] / 20);
  }
  get fillColor_ByEmails() {
    return (
      "rgb(" +
      this.weight * (255 / store.getters["dataset/maxEmailsDay"]) +
      ", " +
      /*this.weight / 1.4 */ 98 +
      "," +
      /*this.weight / 5 */ 98 +
      ")"
    );
  }
  get fillColor_BySentiment() {
    let zScore = this.calculateZscore();
    let B = 130; // Blue
    let R = 127 - Math.round(3000 * zScore);
    let G = 127 + Math.round(3000 * zScore);
    console.log("rgb(" + R + ", " + G + "," + B + ")");
    return "rgb(" + R + ", " + G + "," + B + ")";
  }
  get avgSentiment() {
    return logic.getAvg(this.emails, "sentiment");
  }
  get weight() {
    return this.emails.length;
  }

  calculateZscore() {
    return (
      logic.getAvg(this.emails, "sentiment") / //store.getters["dataset/meanSentiment"]) /
      store.getters["dataset/sampleVarianceSentiment"]
    );
  }
}
