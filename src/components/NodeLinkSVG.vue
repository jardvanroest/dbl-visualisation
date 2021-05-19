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
      const edgeColNeg = "#e498a1",
        edgeColPos = "#b4ecb4",
        edgeColNeutral = "#cfcfc4",
        nodeCol = "#B8E0F6",
        nodeOutline = "#fff";
      const nodeRadius = 5,
        nodeOutlineSize = 1.5;
      const edgeOpacity = 0.6;

      var nodes = [],
        links = [];

      this.parseData(nodes, links);

      const width = 500,
        height = 500; // TODO: hardcoded and no automatic resizing, but seems fine?

      // Create the simulation of forces
      const simulation = d3
        .forceSimulation(nodes)
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.01)) // Pulls nodes to center
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength(function (d, i) {
              return i == 0 ? -60 : -40;
            })
            .distanceMax([Math.max(width, height) * 0.8])
        ) // Nodes repel each other so they don't overlap
        .force(
          "link",
          d3.forceLink(links).id((link) => link.id)
        ) // Push elements to be a fixed distance apart
        .force("x", d3.forceX(width / 2).strength(0.1)) // Attracts elements to specified positions
        .force("y", d3.forceY(height / 2).strength(0.1));

      // Create svg object inside div
      const svg = d3
        .select("#areaNodeLinkSVG")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

      // Draw edges
      const link = svg
        .append("g")
        .attr("stroke-opacity", edgeOpacity)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", function (d) {
          // Color edges based on average sentiment
          if (d.avgSentiment < -0.01) return edgeColNeg;
          if (d.avgSentiment > 0.01) return edgeColPos;
          return edgeColNeutral;
        });

      // Draw nodes
      const node = svg
        .append("g")
        .attr("stroke", nodeOutline)
        .attr("stroke-width", nodeOutlineSize)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("fill", nodeCol)
        .call(drag(simulation)); // Append listener for drag events

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

      // Drag function
      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }
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
        let sentiment = parseFloat(emails[i]["sentiment"]);

        nodesMap.set(u, { id: u });
        nodesMap.set(v, { id: v });

        // Get index of edge in {edges}
        let indexOfEdge = edgesCount.findIndex(
          (element) => element["source"] === u && element["target"] === v
        );
        // If edge does not exist
        if (indexOfEdge === -1) {
          // Push the edge
          edgesCount.push({
            source: u,
            target: v,
            index: [i],
            sentiment: [sentiment],
          });
        } else {
          // Else add new index
          edgesCount[indexOfEdge]["index"].push(i);
          edgesCount[indexOfEdge]["sentiment"].push(sentiment);
        }
      }

      // Compute {links} from {edgesCount} because Maps are stupid in JS
      for (let i = 0; i < edgesCount.length; i++) {
        links.push({
          source: edgesCount[i]["source"],
          target: edgesCount[i]["target"],
          weight: edgesCount[i]["index"].length,
          avgSentiment:
            edgesCount[i]["sentiment"].reduce((a, b) => a + b, 0) /
            edgesCount[i]["sentiment"].length,
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
