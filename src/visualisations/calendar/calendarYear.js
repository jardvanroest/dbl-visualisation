import * as d3 from "d3";

export class CalendarYear {
  constructor(data) {
    this.parsedData = _groupData(data);
  }

  getData() {
    return this.parsedData;
  }
  _groupData(set) {
    let group = d3.groups(set, (d) => d.date.getUTCFullYear()).sort();
    for (let i = 0; i < group.length; i++) {
      group[i][1] = __parseDates(group[i][1]);
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

  _convertToArrayOfArrays(objectOfObjects) {
    const arrayOfObjects = Object.values(objectOfObjects);

    for (let i = 0; i < arrayOfObjects.length; i++) {
      arrayOfObjects[i] = Object.values(arrayOfObjects[i]);
    }

    return arrayOfObjects;
  }
}

function _groupData(set) {
  let group = d3.groups(set, (d) => d.date.getUTCFullYear()).sort();
  for (let i = 0; i < group.length; i++) {
    group[i][1] = __parseDates(group[i][1]);
  }
  return group;
}

function __parseDates(arrDates) {
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
