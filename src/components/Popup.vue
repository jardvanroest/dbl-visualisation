<template>
  <div @click="togglePopup()" class="popup">
    <div @click="togglePopup()" class="popup-inner">
      <slot />
      <div class="link-container">
        <h2 class="title-text">Get Shareable Link</h2>
        <h3>
          <!-- use of <input> field is necessary for clipboard functionality -->
          <input
            class="link-text"
            type="text"
            id="dataset-link"
            v-model="getDatasetLink"
            readonly
          />&nbsp;<Btn
            class="button"
            @click="copyToClipboard()"
            text="Copy to clipboard"
          />
        </h3>
      </div>
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
.popup {
  font-family: "Roboto", sans-serif;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    min-width: 40%;
    max-width: 60%;
    z-index: 1000;
    background: var(--background-color);
    border-radius: 0.7rem;
    padding: 0.6rem;
    filter: drop-shadow(0rem 0rem 1.5rem rgba(0, 0, 0, 0.4));
  }

  .title-text {
    min-width: 80%;
    height: 1.5rem;
    display: block;
    margin: 0 auto;
    // align with link box
    transform: translate(9.5%, 30%);
    letter-spacing: 0.05rem;
    font-weight: bold;
  }

  .link-text {
    font-family: monospace, monospace;
    min-width: 80%;
    height: 1.5rem;
    font-size: 1.15rem;
    display: block;
    margin: 0 auto;
    background-color: var(--background-color-2);
  }
  .button {
    min-width: 20%;
    max-width: 80%;
    height: 2.3rem;
    font-size: 1rem;
    display: block;
    margin: 0 auto;
    font-weight: bold;
  }
}
</style>
