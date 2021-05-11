<template>
  <p @click="importExampleDataset">Or view an example instead</p>
</template>

<script>
import { parseString } from "@/logic/parsing.js";
import { Dataset } from "@/logic/dataset.js";
import exampleDataSet from "@/assets/datasets/exampleDataset.csv";

export default {
  name: "ViewExampleDataSetBtn",
  methods: {
    importExampleDataset() {
      this.saveData(parseString(exampleDataSet));
      this.goToVisualisationPage();
    },
    saveData(data) {
      this.$store.state.dataset = new Dataset(data);
    },
    goToVisualisationPage() {
      this.$router.push({ path: "visualisation" });
    },
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
