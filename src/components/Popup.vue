<template>
  <div class="popup-container">
    <div @click="togglePopup" class="popup-bg" />

    <div class="link-container">
      <div class="title-text">Get shareable link</div>
      <!-- use of <input> field is necessary for clipboard functionality -->
      <input
        class="link-text"
        type="text"
        id="dataset-link"
        v-model="getDatasetLink"
      />
      <Btn class="button" @click="copyToClipboard" text="Copy to clipboard" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Btn from "@/components/Btn.vue";

export default {
  name: "Popup",
  components: {
    Btn,
  },
  computed: {
    ...mapGetters("dataset", ["getDatasetLink"]),
  },
  methods: {
    copyToClipboard() {
      /* Get the text field */
      var copyText = document.getElementById("dataset-link");
      copyText.select();
      document.execCommand("copy");
      console.log("Copied the text: " + copyText.value);
    },
    togglePopup() {
      this.$emit("toggle-popup");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-container {
  z-index: 101;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 1vw;
}

.popup-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.link-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 1.25em;

  width: 30em;
  padding: 1.5em !important;

  background: var(--background-color);
  border-radius: 0.7rem;
  padding: 0.6rem;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}

.title-text {
  font-size: 2vw;
}

.link-text {
  font-family: monospace, monospace;
  background-color: rgba(241, 241, 241, 0.486);

  border: 1px solid rgb(180, 180, 180);
  border-radius: 4px;
  padding: 0.25em 0.5em;
}

.button {
  margin: 0 auto;
  width: fit-content;
  font-size: 1.1em;
}
</style>
