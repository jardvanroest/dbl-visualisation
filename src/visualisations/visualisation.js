import * as d3 from "d3";

export class Visualisation {
  constructor(HTMLSelector) {
    this.HTMLSelector = HTMLSelector;
    this.width = 500;
    this.height = 500;
    this.svg = this._createSVG();
  }

  redraw() {
    throw new Error("Redraw method should be implemented in subclass");
  }

  _resetVisualisation() {
    d3.select(this.HTMLSelector).select("svg").remove();
  }

  _getSVG() {
    const svg = this._createSVG();
    const zoomableSVG = this._makeZoomAndPannable(svg);
    return zoomableSVG;
  }

  _createSVG() {
    return d3
      .select(this.HTMLSelector)
      .append("svg")
      .attr("viewBox", [0, 0, this.width, this.height])
      .attr("preserveAspectRatio", "xMinYMin meet");
  }

  _makeZoomAndPannable(svg) {
    const g = svg
      .call(
        d3
          .zoom()
          .scaleExtent([1, 5])
          .on("zoom", function (event) {
            g.attr("transform", event.transform);
          })
      )
      .append("g");

    return g;
  }

  _newEmailsObject(emailsArray, location) {
    // Reset data
    let sentiments = [];
    let dates = [];
    let maxDate = new Date("1001-01-01");
    let minDate = new Date("3001-01-01");

    location.tabbed = {
      TO: 0,
      CC: 0,
    };

    emailsArray.forEach((email) => {
      // Count different {messageTypes}
      _AddMessageType(email.messageType, location);

      // Get all sentiments
      sentiments.push(parseFloat(email.sentiment));

      // Get the current elements date and sort it
      _sortDates(new Date(email.date));
    });
    _formatDates(location);

    // Get average sentiment
    location.average_sentiment = _getAvgValue(sentiments).toPrecision(3);

    // Used functions for calculating some properties//

    function _AddMessageType(messageType, f) {
      if (messageType === "CC") f.tabbed.CC++;
      if (messageType === "TO") f.tabbed.TO++;
    }

    function _sortDates(currentDate) {
      dates.push(currentDate.toDateString());
      if (currentDate < minDate) minDate = currentDate;
      if (currentDate > maxDate) maxDate = currentDate;
    }

    function _formatDates(f) {
      // Convert dates to correct format
      minDate = _formatDate(minDate);
      maxDate = _formatDate(maxDate);

      // Check if its the same date and set corresponding data
      if (minDate === maxDate) {
        f.Date = minDate;
      } else {
        f.From = minDate;
        f.Until = maxDate;
      }
    }

    function _formatDate(date) {
      return date.toDateString().split(" ").slice(1).join(" ");
    }

    function _getAvgValue(array) {
      // Gets avarage value in an array
      const AvgVal = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      return AvgVal(array);
    }
  }
}
