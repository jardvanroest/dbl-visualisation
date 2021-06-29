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
  width: 20px;
  height: 20px;
  display: block;
  position: relative;
  padding: 2px;
  margin-bottom: 2px;
  background: var(--background-color);
  border: 1px solid var(--accent-color-2);
  border-radius: 10%;

  &:hover {
    background: var(--background-color-2);
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
    width: 10px;
    height: 2px;
  }

  &--vertical {
    width: 2px;
    height: 10px;
  }
}
</style>
