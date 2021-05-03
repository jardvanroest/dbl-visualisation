<template>
  <div>
    <p @click="openFilePicker">Import dataset (.csv)</p>
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

export default {
  name: "ImportDataSetBtn",
  methods: {
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    importFile(event) {
      const file = this.getFile(event.target);
      parseFile(file).then(this.saveData).catch(this.handleError);
    },
    getFile(src) {
      return src.files[0];
    },
    saveData(data) {
      this.$store.state.dataset = new Dataset(data);
    },
    handleError(error) {
      console.error(error.message);
    },
  },
};
</script>

<style scoped lang="scss">
p {
  color: white;
  background-color: #769ad5;
  font-weight: 600;
  padding: 10px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &:hover {
    background-color: #6180b1;
    cursor: pointer;
  }
}

.hidden {
  display: none;
}
</style>
