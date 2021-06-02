<template>
  <div id="areaNodeLinkSVG"></div>
</template>

<script>
import { mapGetters } from "vuex";
import { NodeLinkVisualisation } from "../../visualisations/node-link";

export default {
  name: "NodeLinkSVG",
  computed: {
    ...mapGetters("dataset", ["filteredEmails"]),
  },
  data() {
    return {
      nodeLink: new NodeLinkVisualisation(),
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
