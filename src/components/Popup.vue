<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button @click="togglePopup()">Close Popup</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  methods: {
    togglePopup() {
      this.$emit("toggle-popup");
    },
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
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background: #fff;
    padding: 32px;
  }
}
</style>
