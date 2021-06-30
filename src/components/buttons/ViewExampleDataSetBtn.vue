<template>
  <p @click="importExampleDataset">or view an example instead</p>
</template>

<script>
import { parseString } from "@/logic/parsing.js";
import exampleDataSet from "@/assets/datasets/exampleDataset.csv";
import { mapActions } from "vuex";

export default {
  name: "ViewExampleDataSetBtn",
  methods: {
    importExampleDataset() {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          this.saveData({ data: parseString(exampleDataSet), isDefault: true });
          this.goToVisualisationPage();
          resolve();
        }, 0);
      });
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
  margin: 0.5em;

  &:hover {
    cursor: pointer;
    color: var(--accent-color-2);
  }
}
</style>
