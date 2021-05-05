<template>
  <div>
    <Btn @click="openFilePicker" text="Upload dataset (.csv)" />
    <input
      type="file"
      accept=".csv"
      class="hidden"
      ref="fileInput"
      @change="importFile"
    />
  </div>
</template>

<script>
import { parseFile } from "@/logic/parsing.js";
import { Dataset } from "@/logic/dataset.js";
import Btn from "@/components/Btn.vue";

export default {
  name: "ImportDataSetBtn",
  components: {
    Btn,
  },
  methods: {
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    importFile(event) {
      const file = this.getFile(event.target);
      parseFile(file)
        .then(this.saveData)
        .then(this.goToVisualisationPage)
        .catch(this.handleError);
    },
    getFile(src) {
      return src.files[0];
    },
    saveData(data) {
      this.$store.state.dataset = new Dataset(data);
      console.log(this.$store.state.dataset);
    },
    goToVisualisationPage() {
      this.$router.push({ path: "visualisation" });
    },
    handleError(error) {
      console.error(error.message);
    },
  },
};
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}
</style>
