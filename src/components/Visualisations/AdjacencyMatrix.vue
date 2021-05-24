<template>
  <div style="text-align: center">
    <div id="areaAdjacencyMatrix" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdjacencyMatrix",
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "numberOfPersons", "persons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.resetMatrix();
        this.generateMatrix();
      },
    },
  },
  mounted() {
    this.generateMatrix();
  },
  methods: {
    ...mapActions("dataset", ["changeInspectorData"]),
    generateMatrix() {
      // Colors
      const edgeCol = "#DF848F";
      const normalCol = "#B8E0F6";

      var d = this.filteredEmails;
      var nodes = this.numberOfPersons;
      var people = this.persons;

      var edges = [];
      let vm = this; // Create correct {this.} context for use in d3

      // Iterate through {d} to compute {nodes} and {edges}
      for (let i = 0; i < d.length; i++) {
        let u = parseInt(d[i]["fromId"]);
        let v = parseInt(d[i]["toId"]);

        if (isNaN(u) || isNaN(v)) {
          console.warn("NaN values found on row: " + i);
          continue;
        }

        // Get index of edge in {edges}
        let indexOfEdge = edges.findIndex(
          (element) => element["from"] === u && element["to"] === v
        );
        // If edge does not exist
        if (indexOfEdge === -1) {
          // Push the edge
          edges.push({ from: u, to: v, index: [i] });
        } else {
          // Else add new index
          edges[indexOfEdge]["index"].push(i);
        }
      }

      // Append the svg object to the div
      const svg = d3
        .select("#areaAdjacencyMatrix")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet") // TODO: sizing is weird because of this ?
        .attr("viewBox", "0 0 450 450")
        .classed("svg-content", true);

      // Set size variables
      const width = 426, // TODO: resizing shouldn't be hard coded in (might be fine tho)
        rectLen = width / (nodes + 2),
        rectMargin = rectLen * 0.06;

      /* Create {data} matrix of size [nodes + 1][nodes + 1]
       * data[i][j] = edgesCol - edge [i, j] exists
       * data[i][j] = normalCol - edge [i, j] does not exist
       * data[i][j] is an integer - first row and column
       */
      var data = [];
      // First row contains the nodes indices
      var firstRow = [0];
      people.forEach((person) => {
        firstRow.push(person["id"]);
      });
      data.push(firstRow);

      people.forEach((personY) => {
        // First column contains the nodes indices
        let temp = [personY["id"]];
        // Every other column contains the correct data
        people.forEach((personX) => {
          var obj = {
            from: personX["id"], // Original column
            to: personY["id"], // Original row
            weight: 0, // Number of datapoints {dataIndex.length()}
            dataIndex: [], // All data point indices in original dataset
            fillColor: normalCol, // Color of node
          };
          temp.push(obj); // Push current data point
        });
        data.push(temp); // Push row
      });

      // Populate {data} matrix based on {edges} content
      for (let i = 0; i < edges.length; i++) {
        let from = edges[i]["from"];
        let to = edges[i]["to"];

        data[to][from] = {
          from: from,
          to: to,
          weight: edges[i]["index"].length,
          dataIndex: edges[i]["index"],
          fillColor: edgeCol,
        };
      }

      // Create a group for each row so it can be translated vertically
      var rowGrp = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          // d - data element; i - index element
          return "translate(0, " + (rectLen + rectMargin) * i + ")";
        });

      // Add rectangles for each row group and color accordingly
      rowGrp
        .selectAll("g")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("g")
        .append("rect")
        .attr("x", function (d, i) {
          return (rectLen + rectMargin) * i;
        })
        .attr("width", rectLen)
        .attr("height", rectLen)
        .attr("fill", function (d) {
          // Color based on {data} matrix
          if (Number.isInteger(d)) return "#d3d3d3";
          // TODO: add node labels?
          else return d["fillColor"];
        })
        //On click change the inspector data by calling {changeInspectorData}
        .on("click", function (event, data) {
          vm.changeInspectorData(data);
        });
    },
    resetMatrix() {
      d3.select("#areaAdjacencyMatrix").select("svg").remove();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.svg-content {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
