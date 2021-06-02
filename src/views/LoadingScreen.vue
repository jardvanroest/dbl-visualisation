<template>
  <div class="centered-container">
    <img src="../assets/icons/loading.gif" />
    <h3 class="title">Loading your dataset...</h3>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import axios from "axios";

let dataset_id = new URL(location.href).searchParams.get("id");

export default {
  name: "LoadingScreen",
  mounted: function () {
    this.goToVisualisationPage();
  },
  methods: {
    goToVisualisationPage() {
      const vm = this;

      function saveAndVisualise(dataset) {
        // is default so the data is not re-uploaded
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
    },
    ...mapActions("dataset", ["saveData"]),
    ...mapMutations("dataset", ["updateDatasetID"]),
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
</style>
