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
import Btn from "@/components/buttons/Btn.vue";
import { mapActions } from "vuex";

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
        .then((result) => {
          vm.saveData({ data: result, isDefault: false });
        })
        .then(this.goToVisualisationPage)
        .catch(this.handleError);
    },
    getFile(src) {
      return src.files[0];
    },
    goToVisualisationPage() {
      this.$router.push({ path: "visualisation" });
    },
    handleError(error) {
      console.error(error.message);
    },
    ...mapActions("dataset", ["saveData"]),
  },
};
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}
</style>
