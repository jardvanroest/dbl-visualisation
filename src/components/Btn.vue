<template>
  <button @click="onClick()" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "Btn",
  props: {
    text: String,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>

<style scoped>
button {
  font: inherit;
  background: none;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;

  padding: 0.5em 1em;
  transition: 500ms;
}

button:hover,
button:focus {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}
</style>
