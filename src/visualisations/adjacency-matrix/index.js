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

  showSelection(selectedNodes) {
    const selectColor = "#A585C1";

    const selectedNodesArr = Object.values(selectedNodes);

    this.drawnRows.attr("stroke", function (d, i) {
      const selected = selectedNodesArr.includes(i);
      if (selected) return selectColor;
    });

    this.drawnColumns.attr("stroke", function (d, i) {
      const selected = selectedNodesArr.includes(i);
      if (selected) return selectColor;
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

    this.drawnRows = this._drawRows(svg, matrix);
    this._drawCells(this.drawnRows);
    this.drawnColumns = this._drawColumns(svg, matrix);
    this._drawTransparentCells(this.drawnColumns);
  }

  _drawRows(svg, matrix) {
    return svg
      .append("g")
      .selectAll("g")
      .data(matrix)
      .enter()
      .append("g")
      .attr("transform", this._getRowTranslation.bind(this));
  }

  _drawColumns(svg, matrix) {
    // Transpose matrix
    matrix.map((_, colIndex) => matrix.map((row) => row[colIndex]));
    return svg
      .append("g")
      .selectAll("g")
      .data(matrix)
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
      .attr("fill", function (d) {
        return d.fillColor;
      })
      .attr("stroke-width", this.rectMargin * 2);
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
      .attr("fill", function (d) {
        return "transparent";
      })
      .attr("stroke-width", this.rectMargin * 2);
  }

  _getPositionFromIndex(d, i) {
    const position = (this.rectLength + this.rectMargin) * i;
    return position;
  }
}
