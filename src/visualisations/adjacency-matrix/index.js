import { Visualisation } from "@/visualisations/visualisation.js";
import { Matrix } from "@/visualisations/adjacency-matrix/matrix.js";
import store from "@/store";
import * as d3 from "d3";
import { hydrate } from "vue";
import { addEmitHelper } from "typescript";

export class AdjacencyMatrix extends Visualisation {
  constructor(HTMLSelector) {
    super(HTMLSelector);
  }

  redraw(emails, personsRows, personsCols) {
    this.emails = emails;
    this.personsRows = personsRows;
    this.personsCols = personsCols;
    this.resetVisualisation();
    this._generateVisualisation();
  }

  showSelection(selectedNodes) {
    const { selectedRows, selectedCols } = this._computeSelected(selectedNodes);
    const that = this;
    this.drawnRows.attr("stroke", function (d, i) {
      const selected = selectedRows.includes(i);
      if (selected) return that.selectColor;
      else return that.transparentColor;
    });

    this.drawnColumns.attr("stroke", function (d, i) {
      const selected = selectedCols.includes(i);
      if (selected) return that.selectColor;
      else return that.transparentColor;
    });

    this.drawnColumns.each(function (d, i) {
      if (selectedCols.includes(i))
        d3.select(this).selectAll("rect").attr("selected", "true");
      else d3.select(this).selectAll("rect").attr("selected", "false");
    });
  }

  // Computes rows and columns indices based on selectedNodes
  _computeSelected(selectedNodes) {
    let selectedRows = [];
    let selectedCols = [];

    const selectedNodesArr = Object.values(selectedNodes);

    for (let index = 0; index < this.personsRows.length; index++) {
      const rowPersonID = this.personsRows[index].id;
      const colPersonID = this.personsCols[index].id;

      if (selectedNodesArr.includes(rowPersonID)) selectedRows.push(index);

      if (selectedNodesArr.includes(colPersonID)) selectedCols.push(index);
    }

    return { selectedRows, selectedCols };
  }

  _generateVisualisation() {
    const svg = this._getSVG();
    const matrix = this._getMatrix();
    const sorted_matrix = this._sortMatrix(matrix);
    this._drawVisualisation(svg, sorted_matrix);
  }

  _getMatrix() {
    let matrix = new Matrix(this.personsRows);

    // Set {MatrixData} the first time when loading the matrix // NOT WORKING
    if (store.getters["dataset/getMatrixDataForSorting"] === -1) {
      store.dispatch("dataset/changeMatrixData", matrix.getMatrixData());
    }

    return matrix.getMatrixData();
  }

  _sortMatrix(matrix) {
    let new_matrix = [];

    for (let i = 0; i < this.personsRows.length; i++) {
      let row = [];
      let recipient = this.personsRows[i];

      for (let i = 0; i < this.personsCols.length; i++) {
        let sender = this.personsCols[i];

        row.push(matrix[recipient.id - 1][sender.id - 1]);
      }
      new_matrix.push(row);
    }

    return new_matrix;
  }

  _drawVisualisation(svg, matrix) {
    let margin = 0.2;
    let nodeLength = this.width / this.personsRows.length;

    this.rectLength = (1 - margin) * nodeLength;
    this.rectMargin = margin * nodeLength;

    this.drawnRows = this._drawRows(svg, matrix);
    this._drawCells(this.drawnRows);
    this.drawnColumns = this._drawColumns(svg, matrix);
    this._drawTransparentCells(this.drawnColumns);
  }

  _drawRows(svg, matrix) {
    return svg
      .selectAll("g")
      .data(matrix)
      .enter()
      .append("g")
      .attr("transform", this._getRowTranslation.bind(this));
  }

  _drawColumns(svg, matrix) {
    // Transpose matrix
    const transpMatrix = [...matrix].map((_, colIndex) =>
      matrix.map((row) => row[colIndex])
    );

    return svg
      .append("g")
      .selectAll("g")
      .data(transpMatrix)
      .enter()
      .append("g")
      .attr("transform", this._getColumnTranslation.bind(this));
  }

  _getRowTranslation(_, i) {
    const y = this._getPositionFromIndex(_, i);
    return `translate(0, ${y})`;
  }

  _getColumnTranslation(_, i) {
    const x = this._getPositionFromIndex(_, i);
    return `translate(${x}, 0)`;
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
      .attr("fill", function (d) {
        return d.fillColor;
      });
  }

  _drawTransparentCells(columns) {
    return columns
      .selectAll("g")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("y", this._getPositionFromIndex.bind(this))
      .attr("width", this.rectLength)
      .attr("height", this.rectLength)
      .attr("stroke-width", this.rectMargin)
      .attr("fill", function (d) {
        return "transparent";
      })
      .on("click", this.updateInspectorData.bind(this));
  }

  _getPositionFromIndex(d, i) {
    const position = (this.rectLength + this.rectMargin) * i;
    return position;
  }

  updateInspectorData(event, data) {
    this._changeInspectedElement(event.target);
    let sender = data.sender;
    let recipient = data.recipient;
    let emails = data._emails;

    let inspectorData = {};

    if (sender === recipient) {
      inspectorData.sender_and_recipient = {
        email: sender.emailAddress,
        id: sender.id,
        title: sender.jobTitle,
        included_in_filter: this._isFiltered(sender),
      };
    } else {
      inspectorData.sender = {
        email: sender.emailAddress,
        id: sender.id,
        title: sender.jobTitle,
        included_in_filter: this._isFiltered(sender),
      };
      inspectorData.recipient = {
        email: recipient.emailAddress,
        id: recipient.id,
        title: recipient.jobTitle,
        included_in_filter: this._isFiltered(recipient),
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
