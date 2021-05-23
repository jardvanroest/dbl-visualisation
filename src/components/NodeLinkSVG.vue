<template>
  <div style="text-align: center">
    <h1>Node-link Diagram</h1>
    <br />
    <div id="areaNodeLinkSVG" style="padding: 30px"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { NodeLink } from "../visualisations/node-link/NodeLink.js";

export default {
  name: "NodeLinkSVG",
  computed: {
    ...mapGetters("dataset", ["filteredEmails"]),
  },
  data() {
    return {
      nodeLink: new NodeLink(),
    };
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redraw();
      },
    },
  },
  mounted() {
    this.redraw();
  },
  methods: {
    redraw() {
      this.nodeLink.redraw(this.filteredEmails);
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
