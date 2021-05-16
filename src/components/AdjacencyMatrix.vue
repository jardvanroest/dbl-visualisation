<template>
  <div style="text-align: center">
    <h1>Adjacency Matrix</h1>
    <br />
    <div id="area" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "AdjacencyMatrix",
  computed: {
    ...mapGetters(["filteredEmails", "numberOfPersons"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        d3.select("svg").remove();
        this.generateMatrix();
      },
    },
  },
  mounted() {
    this.generateMatrix();
  },
  methods: {
    generateMatrix() {
      // Colors and data object
      const edgeCol = "#DF848F";
      const normalCol = { fillColor: "#B8E0F6", dataIndex: -1 }; // -1 for non-existing data points

      var d = this.filteredEmails;
      var nodes = this.numberOfPersons;
      var edges = [];

      // Iterate through {d} to compute {nodes} and {edges}
      for (let i = 0; i < d.length; i++) {
        let u = parseInt(d[i]["fromId"]);
        let v = parseInt(d[i]["toId"]);

        if (isNaN(u) || isNaN(v)) {
          console.warn("NaN values found on row: " + i);
          continue;
        }

        edges.push({ from: u, to: v, index: i });
      }

      // Append the svg object to the div
      const svg = d3
        .select("#area")
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
      data.push(d3.range(0, nodes + 1)); // First row contains the nodes indices
      for (let i = 1; i <= nodes; i++) {
        var temp = new Array(nodes + 1).fill(normalCol);
        temp[0] = i; // First column contains the nodes indices

        data.push(temp);
      }

      // Populate {data} matrix based on {edges} content
      for (let i = 0; i < edges.length; i++) {
        let from = edges[i]["from"];
        let to = edges[i]["to"];

        data[to][from] = { fillColor: edgeCol, dataIndex: edges[i]["index"] };
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
        // Add on click event
        .on("click", function (event, _data) {
          if (_data["dataIndex"] === -1) {
            // In case edge doesn't exist
            console.log("Edge does not exist in the adjacency matrix!");
          } else if (_data["dataIndex"] === undefined) {
            // If clicked on index row/column
            console.log(_data);
          } else {
            // If it exists log the data
            console.log(d[_data["dataIndex"]]);
          }
        });
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
