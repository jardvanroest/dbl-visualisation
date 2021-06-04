import { Visualisation } from "@/visualisations/visualisation.js";
import { Matrix } from "@/visualisations/adjacency-matrix/matrix.js";

export class AdjacencyMatrixVisualisation extends Visualisation {
  constructor(changeInspectorData) {
    super("#areaAdjacencyMatrix");

    this.changeInspectorData = changeInspectorData;

    this.options = {
      width: 426,
    };
  }

  redraw(emails, persons) {
    this.emails = emails;
    this.persons = persons;
    this._resetVisualisation();
    this._generateVisualisation();
  }

  // TODO: looks like selectedNodes is not updating when user discards selection by clicking outside the brush rect
  showSelection(selectedNodes) {
    const selectColor = "#A585C1";

    // IDEA: !!! only update on MouseUp, and not when brush rect is dragged
    // IDEA: make groups for cols and highlight whole groups? so there's less elements to iterate through, change outline not border
    // get nth child of div to identify groups

    const selectedNodesArr = Object.values(selectedNodes);

    this.drawnCells.attr("stroke", function (d) {
      const selected =
        selectedNodesArr.includes(d.sender.id) ||
        selectedNodesArr.includes(d.receiver.id);

      if (selected) return selectColor;
      else return "white";
    });
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
    this.rectLength = this.options.width / (this.persons.length + 2);
    this.rectMargin = this.rectLength * 0.06;

    const drawnRows = this._drawRows(svg, matrix);
    this.drawnCells = this._drawCells(drawnRows);
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
      .attr("fill", function (d) {
        return d.fillColor;
      })
      .attr("stroke-width", "0.03%");
  }

  _getPositionFromIndex(d, i) {
    const position = (this.rectLength + this.rectMargin) * i;
    return position;
  }
}
