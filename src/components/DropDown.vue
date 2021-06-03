<template>
  <div class="container">
    <div class="select">
      <select id="selector" v-model="selectedType">
        <option v-for="item in items" :key="item.value" :value="item.value">
          {{ item.name }}
        </option>
      </select>
      <span class="custom-arrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: ["items"],
  data: function () {
    return {
      selectedType: undefined,
    };
  },
  watch: {
    selectedType: {
      deep: true,
      handler(value) {
        this.$emit("changed", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
}
.select {
  font: inherit;
  position: relative;
}

#selector {
  border-radius: 0.32em;
  padding: 0.3em 1.5em 0.3em 0.3em;
  background-color: var(--background-color);
  border: var(--settings-border);

  &:focus {
    border: 2px solid black;
  }
  &:focus * {
    color: var(--accent-color);
  }
  &:focus + .custom-arrow {
    border: 2px solid black;
    border-left: 0;
  }
}

/* Make custom arrow for drop-down menu */
.custom-arrow {
  display: block;
  position: absolute;

  top: 0;
  right: 0;
  height: calc(100% - 4px);
  width: 2em;

  border: var(--settings-border);
  border-left: 0;
  border-top-right-radius: 0.32em;
  border-bottom-right-radius: 0.32em;
  background: var(--accent-color);
  pointer-events: none;
}

.custom-arrow::before,
.custom-arrow::after {
  --size: 0.45em;

  content: "";
  position: absolute;
  width: 0;
  height: 0;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
}

.custom-arrow::before {
  border-bottom: var(--size) solid var(--background-color);
  top: 35%;
}

.custom-arrow::after {
  border-top: var(--size) solid var(--background-color);
  top: 65%;
}
</style>
