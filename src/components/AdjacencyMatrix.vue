<template>
  <div style="text-align: center">
    <h1>Adjacency Matrix</h1>

    <br />
    <div id="area" ref="container" style="padding: 30px">
      <Tooltip
        ref="tooltip"
        :data="tooltip_data"
        :posX="tooltip_posX"
        :posY="tooltip_posY"
        :visible="tooltip_visible"
      />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";
import Tooltip from "@/components/Tooltip";
//import { tooltipInformationParser } from "@/logic/componentsLogic";
export default {
  name: "AdjacencyMatrix",
  components: {
    Tooltip,
  },
  data() {
    return {
      tooltip_data: {},
      tooltip_posX: 0,
      tooltip_posY: 0,
      tooltip_visible: false,
    };
  },
  computed: {
    ...mapGetters("dataset", [
      "filteredEmails",
      "numberOfPersons",
      "getPersonById",
    ]),
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
    generateMatrix() {
      const edgeCol = "#DF848F";
      const normalCol = { fillColor: "#B8E0F6", dataIndex: [-1], weight: 0 }; // -1 for non-existing data points

      var d = this.filteredEmails;
      var nodes = this.numberOfPersons;

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

        edges.push({ from: u, to: v, index: i });
      }

      // Append the svg object to the div
      const svg = d3
        .select("#area")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet") // TODO: sizing is weird because of this ?
        .attr("viewBox", "0 0 450 450")
        .classed("svg-content", true);

      var tooltip = d3
        .select("#area")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .html(
          "<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>"
        );

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

        data[to][from] = {
          fillColor: edgeCol,
          dataIndex: edges[i]["index"],
          weight: edges[i]["index"].length,
        };
      }

      // Create a group for each row so it can be translated vertically
      var rowGrp = svg
        .attr("id", "asd")
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
          vm;
          // Color based on {data} matrix
          if (Number.isInteger(d)) return "#d3d3d3";
          else return d["fillColor"];
        })
        .on("mouseover", function (event, data) {
          return data["dataIndex"] > -1
            ? tooltip.style("visibility", "visible")
            : tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function (event, data) {
          return tooltip
            .style("top", event.pageY - 80 + "px")
            .style("left", event.pageX + 80 + "px")
            .html("<p>" + data["dataIndex"] + "</p>");
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        });
      // ADDED click event

      //.on("click", function (event, data) {
      //  vm.changeInspetorData(data);
      //});
      //d3.select("#asd")

      // hoover event
      //.on("mouseover", function (event, data) {
      //console.log(data);
      //if (data["dataIndex"] !== undefined)
      //if (data["dataIndex"] > -1) {
      // emails
      // sender
      // reciver
      //console.log(vm.getPersonById);
      //vm.$data.tooltip_data = vm.tooltipInformationParser(
      //  d[data["dataIndex"]]
      //); // for now it shows only the first row of data;
      //vm.$data.tooltip_posX = event.clientX;
      //vm.$data.tooltip_posY = event.clientY;
      //vm.$data.tooltip_visible = true;
      //}
      //})
      //.on("mouseleave", function () {
      //vm.$data.tooltip_visible = false;
      //});
    },
    resetMatrix() {
      d3.select("svg").remove();
    },
    tooltipInformationParser(pointerObj) {
      let sender = this.getPersonById(pointerObj["fromId"]);
      let receiver = this.getPersonById(pointerObj["toId"]);

      return { sender: sender.Email, receiver: receiver.Email };
      //let idReceiver = data[pointer["dataIndex"]]["toId"];
      //return {
      //  sender: data[idSender]["Email"],
      //  receiver: data[idReceiver]["Email"],
      //};
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
.laina {
  top: 100;
}
</style>
