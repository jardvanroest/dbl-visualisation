<template>
  <div style="text-align: center">
    <h1>Node-link Diagram</h1>
    <br />
    <div id="areaNodeLinkSVG" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "NodeLinkSVG",
  computed: {
    ...mapGetters("dataset", ["filteredEmails"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.resetVis();
        this.generateVis();
      },
    },
  },
  mounted() {
    this.generateVis();
  },
  methods: {
    generateVis() {
      // Colors and Design values
      const edgeCol = "#DF848F",
        nodeCol = "#B8E0F6",
        nodeOutline = "#fff";
      const nodeRadius = 5,
        nodeOutlineSize = 1.5;
      const edgeOpacity = 0.6;

      var nodes = [],
        links = [];

      this.parseData(nodes, links);

      console.log(nodes, links);

      const width = 500,
        height = 500; // TODO: hardcoded and no automatic resizing, but seems fine?

      // Create the simulation of forces TODO: improve this to make the diagram more clear
      const simulation = d3
        .forceSimulation(nodes)
        .force("center", d3.forceCenter(width / 2, height / 2)) // Pulls nodes to center
        .force("charge", d3.forceManyBody()) // Nodes repel eachother so they don't overlap
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        ) // Specify that id is the link variable TODO: (?)*/
        .force("x", d3.forceX())
        .force("y", d3.forceY());

      // Create svg object inside div
      const svg = d3
        .select("#areaNodeLinkSVG")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

      // Draw edges
      const link = svg
        .append("g")
        .attr("stroke", edgeCol)
        .attr("stroke-opacity", edgeOpacity)
        .selectAll("line")
        .data(links)
        .join("line");
      //TODO: add "stroke-width" based on number of emails

      // Draw nodes
      const node = svg
        .append("g")
        .attr("stroke", nodeOutline)
        .attr("stroke-width", nodeOutlineSize)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("fill", nodeCol); // TODO: color nodes differently somehow
      //TODO: add dragging

      node.append("id").text((d) => d.id); // Append id to each node

      // Append a listener to each tick of the simulation's internal timer
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });
    },
    parseData(nodes, links) {
      var emails = this.filteredEmails;

      // Maps for finding unique nodes and edges
      var nodesMap = new Map(),
        edgesCount = [];

      // Iterate through {emails} to compute {nodes} and {links}
      for (let i = 0; i < emails.length; i++) {
        let u = parseInt(emails[i]["fromId"]);
        let v = parseInt(emails[i]["toId"]);

        nodesMap.set(u, { id: u });
        nodesMap.set(v, { id: v });

        // Get index of edge in {edges}
        let indexOfEdge = edgesCount.findIndex(
          (element) => element["source"] === u && element["target"] === v
        );
        // If edge does not exist
        if (indexOfEdge === -1) {
          // Push the edge
          edgesCount.push({ source: u, target: v, index: [i] });
        } else {
          // Else add new index
          edgesCount[indexOfEdge]["index"].push(i);
        }
      }

      // Compute {links} from {edgesCount} because Maps are stupid in JS
      for (let i = 0; i < edgesCount.length; i++) {
        links.push({
          source: edgesCount[i]["source"],
          target: edgesCount[i]["target"],
          weight: edgesCount[i]["index"].length,
        });
      }

      // Compute {nodes} from {nodesMap} by iterating because JS! >:(
      var temp = Array.from(nodesMap.values());
      for (let i = 0; i < temp.length; i++) nodes.push(temp[i]);

      return;
    },
    resetVis() {
      d3.select("#areaNodeLinkSVG").select("svg").remove();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
