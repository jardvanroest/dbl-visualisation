<template>
  <div class="zoom-btns-container">
    <div class="btn" id="plus" @click="plusClicked">
      <div class="stroke stroke--horizontal"></div>
      <div class="stroke stroke--vertical"></div>
    </div>
    <div class="btn" id="minus" @click="minusClicked">
      <div class="stroke stroke--horizontal"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    plusClicked() {
      this.$emit("zoomIn");
    },
    minusClicked() {
      this.$emit("zoomOut");
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  display: block;
  position: relative;

  width: 1.5em;
  height: 1.5em;
  padding: 0.1em;
  margin-bottom: 0.1em;

  background-color: var(--background-color);
  border: var(--settings-border);
  border-radius: 10%;

  &:hover {
    border-color: var(--accent-color);
    cursor: pointer;
  }
}

.stroke {
  background: var(--accent-color-2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &--horizontal {
    width: 0.725em;
    height: 0.125em;
  }

  &--vertical {
    width: 0.125em;
    height: 0.725em;
  }
}
</style>
