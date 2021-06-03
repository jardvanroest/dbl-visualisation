<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <h3>http://localhost:8080/get?id={{ getDatasetID }}</h3>
      <button @click="togglePopup()">Close Popup</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Popup",
  methods: {
    togglePopup() {
      this.$emit("toggle-popup");
    },
  },
  computed: {
    ...mapGetters("dataset", ["getDatasetID"]),
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.35);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background: #fff;
    padding: 32px;
  }
}
</style>
