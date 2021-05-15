<template>
  <span class="field">{{ field }}: </span>
  <span>{{ info }}</span>
  <br />
</template>

<script>
export default {
  name: "InspectorField",
  props: ["field", "info"],
};
</script>

<style scoped>
.field {
  color: var(--accent-color);
  margin-left: 0.7em;
}
</style>
