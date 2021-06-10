<template>
  <div class="loading-container">
    <div v-if="showError">
      <img class="error-img" src="../assets/icons/error.svg" />
      <h1>404. That's an error.</h1>
      <h3>There is no dataset linked to the provided id.</h3>
    </div>
    <div v-else>
      <div class="spinner" />
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
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 0);
    }).then(() => this.loadVisualisation());
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

.spinner {
  --ldr-size: 1rem;
  --dimensions: calc(4 * var(--ldr-size));

  margin: auto;
  transform: translate(-50%, -50%);

  width: var(--dimensions);
  height: var(--dimensions);

  border: var(--ldr-size) solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: var(--ldr-size) solid var(--accent-color);

  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
