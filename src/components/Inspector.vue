<template>
  <div class="container">
    <p>{{ displayedData }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Inspector",
  computed: {
    ...mapGetters(["getInspectorData"]),
  },
  created() {
    this.displayedData = this.getInspectorData;
  },
  watch: {
    // Watch for a new incoming {inspectorData}
    getInspectorData(newData) {
      this.displayedData = newData;
    },
  },
  data() {
    return {
      displayedData: -1,
    };
  },
};
</script>

<style scoped>
.container {
  background-color: burlywood;
  padding-left: 4px;
}
</style>
