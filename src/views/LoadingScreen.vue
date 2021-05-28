<template>
  <h3>Loading Page Placeholder</h3>
  <Btn @click="goToVisualisationPage" text="Go to visualisation" />
</template>

<script>
import Btn from "@/components/Btn.vue";
import { mapActions } from "vuex";
import axios from "axios";

let dataset_id = new URL(location.href).searchParams.get("id");

export default {
  name: "LoadingScreen",
  components: {
    Btn,
  },
  methods: {
    goToVisualisationPage() {
      const vm = this;

      function saveAndVisualise(dataset) {
        // is default so the data is not re-uploaded
        vm.saveData({ data: dataset, isDefault: true });
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
          console.log(dataset);
          saveAndVisualise(dataset);
        })
        .catch(this.handleError);
    },
    handleError(error) {
      console.error(error.message);
    },
    ...mapActions("dataset", ["saveData"]),
  },
};
</script>
