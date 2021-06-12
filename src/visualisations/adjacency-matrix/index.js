import { Visualisation } from "@/visualisations/visualisation.js";
import { Matrix } from "@/visualisations/adjacency-matrix/matrix.js";
import store from "@/store";

export class AdjacencyMatrix extends Visualisation {
  constructor(HTMLSelector, tooltipsUpdate) {
    super(HTMLSelector);
    this.updateTooltips = tooltipsUpdate;
  }

  redraw(emails, persons) {
    this.emails = emails;
    this.persons = persons;
    this.resetVisualisation();
    this._generateVisualisation();
  }

  _generateVisualisation() {
    const svg = this._getSVG();
    const matrix = this._getMatrix();
    this._drawVisualisation(svg, matrix);
  }

  _getMatrix() {
    const matrix = new Matrix(this.persons, this.emails);
    return matrix.getMatrixData();
  }

  _drawVisualisation(svg, matrix) {
    let margin = 0.1;
    let nodeLength = this.width / this.persons.length;

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
      .append("rect")
      .attr("x", this._getPositionFromIndex.bind(this))
      .attr("width", this.rectLength)
      .attr("height", this.rectLength)
      .attr("stroke-width", this.rectMargin)
      .attr("stroke", "white")
      .attr("fill", function (d) {
        return d.fillColor;
      })
      .on("click", this.updateInspectorData.bind(this))
      .on("mousemove", (e, d) => {
        //console.log(e);
        let pos = {
          top: e.clientY,
          left: e.clientX,
        };
        this.updateTooltips({
          visible: true,
          pos: pos,
          data: { test: "test" },
        });
      })
      .on("mouseout", (e, d) => {
        this.updateTooltips({ visible: false });
      });
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
        included_in_filter: sender.isSelectedInEmailFilter,
      };
    } else {
      inspectorData.sender = {
        email: sender.emailAddress,
        id: sender.id,
        title: sender.jobTitle,
        included_in_filter: sender.isSelectedInEmailFilter,
      };
      inspectorData.recipient = {
        email: recipient.emailAddress,
        id: recipient.id,
        title: recipient.jobTitle,
        included_in_filter: recipient.isSelectedInEmailFilter,
      };
    }
    inspectorData.additional_information = {
      node_color: data.fillColor,
      emails: emails.length,
      // Tabbed fields dont get formated
      tabbed: 0,
    };

    // Add fields only if there are emails
    if (emails.length > 0) {
      this._newEmailsObject(emails, inspectorData.additional_information);
    } else {
      // Remove {tabbed} when there are no emails
      delete inspectorData.additional_information.tabbed;
    }

    store.dispatch("dataset/changeInspectorData", inspectorData);
  }
}
