<template>
  <div style="text-align: center">
    <h1>Node-link Diagram</h1>
    <br />
    <div id="areaNodeLinkSVG" style="padding: 30px"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { NodeLink } from "./NodeLink.js";

export default {
  name: "NodeLinkSVG",
  computed: {
    ...mapGetters("dataset", ["filteredEmails"]),
    ...mapGetters("brush_and_link", ["selectedNodes"]),
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
    ...mapActions("brush_and_link", ["changeSelectedNodes"]),

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
