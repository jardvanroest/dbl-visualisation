<template>
  <div class="import-btn">
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
      this.$emit("newFile");
      const file = this.getFile(event.target);
      new Promise((resolve, reject) => {
        setTimeout(() => {
          parseFile(file)
            .then((result) => {
              this.saveData({ data: result, isDefault: false });
            })
            .then(this.goToVisualisationPage)
            .catch(this.handleError);
          resolve();
        }, 0);
      });
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
.import-btn {
  margin: auto;
  width: fit-content;
  border-radius: var(--border-rad);
  background-color: var(--background-color);
}

.hidden {
  display: none;
}
</style>
