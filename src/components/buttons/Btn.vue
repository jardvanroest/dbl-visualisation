<template>
  <button class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "Btn",
  props: {
    text: String,
  },
};
</script>

<style scoped>
button {
  font: inherit;
  background: none;
  border: 2px solid;
  border-radius: 0.25em;
  cursor: pointer;

  padding: 0.5em 1em;
  transition: 500ms;
}

button:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}
</style>
