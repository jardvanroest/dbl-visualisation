<template>
  <div class="centered-container">
    <img
      v-if="!showError"
      class="loading-img"
      src="../assets/icons/loading.gif"
    />
    <img v-if="showError" class="error-img" src="../assets/icons/error.svg" />
    <h3 v-if="!showError" class="title">Loading your dataset...</h3>
    <h1 v-if="showError" class="title">404. That's an error.</h1>
    <h3 v-if="showError" class="title">
      There is no dataset linked to the provided id.
    </h3>
    <h3></h3>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import axios from "axios";
import { parseString } from "@/logic/parsing.js";
import exampleDataSet from "@/assets/datasets/exampleDataset.csv";

let dataset_id = new URL(location.href).searchParams.get("id");

export default {
  name: "LoadingScreen",
  mounted: function () {
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

      console.log(`Making a GET request for dataset with id:${dataset_id}`);
      axios
        .get(`http://localhost:5000/datasets/${dataset_id}`)
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
.centered-container {
  width: 50rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.title {
  font-family: "Roboto", sans-serif;
  margin-bottom: 1rem;
  letter-spacing: 0.05rem;
}

.error-img {
  width: 27.5rem;
  height: 27.5rem;
  margin: 0.2rem;
  padding: 0.2rem;
}

.loading-img {
  width: 5rem;
  height: 5rem;
  margin: 0.2rem;
  padding: 0.2rem;
}
</style>
