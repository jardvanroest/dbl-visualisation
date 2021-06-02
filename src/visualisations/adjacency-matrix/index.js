import { Visualisation } from "@/visualisations/visualisation.js";
import { Matrix } from "@/visualisations/adjacency-matrix/matrix.js";
import store from "../../store";

export class AdjacencyMatrixVisualisation extends Visualisation {
  constructor(changeInspectorData) {
    super("#areaAdjacencyMatrix");

    this.changeInspectorData = changeInspectorData;
  }

  redraw(emails, personsRows, personsCols) {
    this.emails = emails;
    this.personsRows = personsRows;
    this.personsCols = personsCols;
    this._resetVisualisation();
    this._generateVisualisation();
  }

  _generateVisualisation() {
    const svg = this._getSVG();
    const matrix = this._getMatrix();
    this._drawVisualisation(svg, matrix);
  }

  _getMatrix() {
    const matrix = new Matrix(this.personsRows, this.personsCols);
    // Set {MatrixData} the first time when loading the matrix
    if (store.getters.getMatrixDataForSorting === -1) {
      store.dispatch("changeMatrixData", matrix.getMatrixData());
    }
    return matrix.getMatrixData();
  }

  _drawVisualisation(svg, matrix) {
    let margin = 0.1;
    let nodeLength = this.width / this.personsRows.length;

    this.rectLength = (1 - margin) * nodeLength;
    this.rectMargin = margin * nodeLength;

    const drawnRows = this._drawRows(svg, matrix);
    const drawnCells = this._drawCells(drawnRows);
  }

  _drawRows(svg, matrix) {
    return svg
      .selectAll("g")
      .data(matrix)
      .enter()
      .append("g")
      .attr("transform", this._getRowTranslation.bind(this));
  }

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
      })
      .on("click", this.updateInspectorData.bind(this));
  }

  _getPositionFromIndex(d, i) {
    const position = (this.rectLength + this.rectMargin) * i;
    return position;
  }

  updateInspectorData(event, data) {
    let sender = data.sender;
    let recipient = data.recipient;
    let emails = data._emails;

    let inspectorData = {};

    if (sender === recipient) {
      inspectorData.sender_and_recipient = {
        email: sender.emailAddress,
        id: sender.id,
        title: sender.jobTitle,
      };
    } else {
      inspectorData.sender = {
        email: sender.emailAddress,
        id: sender.id,
        title: sender.jobTitle,
      };
      inspectorData.recipient = {
        email: recipient.emailAddress,
        id: recipient.id,
        title: recipient.jobTitle,
      };
    }
    inspectorData.additional_information = {
      node_color: data.fillColor,
      emails: emails.length,
      // Tabbed fields dont get formated
      tabbed: 0,
    };

    // Reset data
    let sentiments = [];
    let dates = [];
    let maxDate = new Date("1001-01-01");
    let minDate = new Date("3001-01-01");
    let add_info = inspectorData.additional_information;

    // Add fields only if there are emails
    if (emails.length > 0) {
      add_info.tabbed = {
        TO: 0,
        CC: 0,
      };
      add_info = inspectorData.additional_information;

      emails.forEach((email) => {
        // Count different {messageTypes}
        _AddMessageType(email.messageType);

        // Get all sentiments
        sentiments.push(parseFloat(email.sentiment));

        // Get the current elements date and sort it
        _sortDates(new Date(email.date));
      });
      _formatDates();

      // Get average sentiment
      add_info.Average_Sentiment = _getAvgValue(sentiments).toPrecision(3);
    } else {
      // Remove {tabbed} when there are no emails
      delete inspectorData.additional_information.tabbed;
    }

    this.changeInspectorData(inspectorData);

    // Used functions for calculating some properties//

    function _AddMessageType(messageType) {
      if (messageType === "CC") add_info.tabbed.CC++;
      if (messageType === "TO") add_info.tabbed.TO++;
    }

    function _sortDates(currentDate) {
      dates.push(currentDate.toDateString());
      if (currentDate < minDate) minDate = currentDate;
      if (currentDate > maxDate) maxDate = currentDate;
    }

    function _formatDates() {
      // Convert dates to correct format
      minDate = _formatDate(minDate);
      maxDate = _formatDate(maxDate);

      // Check if its the same date and set corresponding data
      if (minDate === maxDate) {
        add_info.Date = minDate;
      } else {
        add_info.From = minDate;
        add_info.Until = maxDate;
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
