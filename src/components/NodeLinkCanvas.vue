<template>
  <div style="text-align: center">
    <h1>Node-link Diagram</h1>
    <br />
    <div id="areaNodeLinkCanvas" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "NodeLinkCanvas",
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "persons"]),
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
      // const edgeCol = "#DF848F",
      //  nodeCol = "#B8E0F6";
      //   nodeOutline = "#fff";
      //const nodeRadius = 5;
      // nodeOutlineSize = 1.5;
      //const edgeOpacity = 0.6;

      var emails = this.filteredEmails;
      var nodes = [],
        links = [];

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

      // Compute {nodes} from {nodesMap}
      nodes = Array.from(nodesMap.values());
      // Compute {links} from {edgesCount} because Maps are stupid in JS
      for (let i = 0; i < edgesCount.length; i++) {
        links.push({
          souce: edgesCount[i]["source"],
          target: edgesCount[i]["target"],
          weight: edgesCount[i]["index"].length,
        });
      }

      console.log(nodes);
      console.log(links);
    },
    resetVis() {
      d3.select("#areaNodeLinkCanvas").select("canvas").remove();
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
