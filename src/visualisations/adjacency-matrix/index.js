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
    const drawnCells = this._drawCells(drawnRows);
    drawnCells;
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
      .on("click", (e, d) => {
        console.log(d);
      });
  }

  _getPositionFromIndex(d, i) {
    const position = (this.rectLength + this.rectMargin) * i;
    return position;
  }
}
