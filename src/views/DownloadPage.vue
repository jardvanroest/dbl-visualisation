<template>
  <div class="loading-container">
    <div v-if="showError">
      <img class="error-img" src="../assets/icons/error.svg" />
      <h1>404. That's an error.</h1>
      <h3>There is no dataset linked to the provided id.</h3>
    </div>
    <div v-else>
      <img class="loading-img" src="../assets/icons/loading.gif" />
      <h1>Loading your dataset...</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import axios from "axios";
import { parseString } from "@/logic/parsing.js";
import exampleDataSet from "@/assets/datasets/exampleDataset.csv";

let dataset_id = new URL(location.href).searchParams.get("id");

export default {
  name: "DownloadPage",
  mounted() {
    this.loadVisualisation();
  },
  methods: {
    importExampleDataset() {
      this.saveData({ data: parseString(exampleDataSet), isDefault: true });
      this.goToVisualisationPage();
    },
    goToVisualisationPage() {
      this.$router.push({ path: "visualisation" });
    },
    ...mapActions("dataset", ["saveData"]),
    loadVisualisation() {
      if (dataset_id !== "default") {
        this.downloadVisualisation();
      } else {
        this.importExampleDataset();
      }
    },
    downloadVisualisation() {
      const vm = this;

      function saveAndVisualise(dataset) {
        // set as default so the data is not re-uploaded
        vm.saveData({ data: dataset, isDefault: true });
        vm.updateDatasetID(dataset_id);
        vm.$router.push({ path: "/visualisation" });
      }
      axios
        .get(
          `http://` +
            process.env.VUE_APP_SERVER_IP +
            `:5000/datasets/${dataset_id}`
        )
        .then((result) => {
          let dataset = [];
          for (var i in result.data) {
            dataset.push(result.data[i]);
          }
          dataset.pop();
          saveAndVisualise(dataset);
        })
        .catch(this.handleError);
    },
    handleError(error) {
      console.error(error.message);
      this.showError = true;
    },
    ...mapActions("dataset", ["saveData"]),
    ...mapMutations("dataset", ["updateDatasetID"]),
  },
  data() {
    return {
      showError: false,
    };
  },
};
</script>

<style scoped lang="scss">
.loading-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  font-family: "Roboto", sans-serif;
  letter-spacing: 0.05rem;
  text-align: center;
}

.error-img {
  width: 27.5rem;
  height: 27.5rem;
}

.loading-img {
  width: 5rem;
  height: 5rem;
}
</style>
