import { Visualisation } from "@/visualisations/visualisation.js";
import { Matrix } from "@/visualisations/adjacency-matrix/matrix.js";
import { RectBrush } from "@/visualisations/brushes/rect-brush.js";
import * as d3 from "d3";
import store from "@/store";
import { hydrate } from "vue";
import { addEmitHelper } from "typescript";

export class AdjacencyMatrix extends Visualisation {
  constructor(HTMLSelector, tooltipsUpdate) {
    super(HTMLSelector);
    this.updateTooltips = tooltipsUpdate;

    this.colors = {
      emails: "#df848f",
      noEmails: "#b8e0f6",
    };
  }

  redraw(emails, personsRows, personsCols) {
    store.dispatch("dataset/updateCalculationVariables", emails);
    this.emails = emails;
    this.personsRows = personsRows;
    this.personsCols = personsCols;
    this.resetVisualisation();
    this._generateVisualisation();
  }

  onNodeSelection(selectedNodes) {
    const { selectedRows, selectedCols } = this._computeSelected(selectedNodes);
    const that = this;
    this.drawnRows.attr("stroke", function (d, i) {
      const selected = selectedRows.includes(i);
      if (selected) return that.nodeSelectColor;
    });

    this.drawnColumns.attr("stroke", function (d, i) {
      const selected = selectedCols.includes(i);
      if (selected) {
        d3.select(this).selectAll("rect").attr("selected", "true");

        return that.nodeSelectColor;
      } else d3.select(this).selectAll("rect").attr("selected", "false");
    });
  }

  toggleInteractionMode(interactionMode) {
    Visualisation.prototype.toggleInteractionMode.call(this);

    this._toggleBrush(interactionMode);
    if (interactionMode == "select") {
      this.drawnTransparentCells.attr("stroke", null);
    }
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
    let matrix = new Matrix(this.personsRows, this.colors);

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
    this.drawnTransparentCells = this._drawTransparentCells(this.drawnColumns);

    // Compute rects with emails
    const that = this;
    const brushableRects = this.drawnRows
      .selectAll("rect")
      .filter(function (d) {
        return d3.select(this).attr("fill") != that.colors.noEmails;
      });

    // Create brush object
    this.brush = new RectBrush(
      svg,
      brushableRects,
      this.width,
      this.height,
      null,
      this.edgeSelectColor
    );

    // Toggle brush based on current {interactionMode}
    const interactionMode = store.getters["brush_and_link/interactionMode"];
    this._toggleBrush(interactionMode);
  }

  _toggleBrush(interactionMode) {
    if (interactionMode === "select") this.brush.appendBrush();
    else this.brush.removeBrush();
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
    const that = this;
    return rows
      .selectAll("g")
      .data(function (d, i) {
        d.forEach((element, index) => {
          element.coords = {
            x: (that.rectLength + that.rectMargin) * index,
            y: (that.rectLength + that.rectMargin) * i,
          };

          const recipientID = element.recipient.id;
          const senderID = element.sender.id;
          element.id = { recipientID, senderID };
        });

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
      .on("click", this.updateInspectorData.bind(this))
      .on("mousemove", (e, d) => {
        if (d.weight > 0) this.updateTooltips(this._dataTooltip(true, e, d));
      })
      .on("mouseout", (e, d) => {
        this.updateTooltips(this._dataTooltip(false));
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
      from: d.sender.emailAddress,
      to: d.recipient.emailAddress,
      emails: d.weight,
    };
  }
  ___parseDate(date) {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
  __positionTooltip(e) {
    return {
      top: this.___styleTop(e.layerY),
      left: this.___styleLeft(e.layerX),
    };
  }
  ___styleTop(layerY) {
    if (layerY > 100) return layerY - 100;
    return layerY + 30;
  }
  ___styleLeft(layerX) {
    if (layerX > 230) return layerX - 170;
    return layerX + 20;
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
