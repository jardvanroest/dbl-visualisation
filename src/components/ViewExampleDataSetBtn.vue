<template>
  <p @click="importExampleDataset">Or view an example instead</p>
</template>

<script>
import { parseString } from "@/logic/parsing.js";
import exampleDataSet from "@/assets/datasets/exampleDataset.csv";
import { mapActions } from "vuex";

export default {
  name: "ViewExampleDataSetBtn",
  methods: {
    importExampleDataset() {
      this.saveData(parseString(exampleDataSet));
      this.goToVisualisationPage();
    },
    goToVisualisationPage() {
      this.$router.push({ path: "visualisation" });
    },
    ...mapActions("dataset", ["saveData"]),
  },
};
</script>

<style scoped lang="scss">
p {
  text-decoration: underline;
  margin: 4px;

  &:hover {
    cursor: pointer;
    color: #2e2e2e;
  }
}
</style>
