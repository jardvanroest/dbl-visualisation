<template>
  <span class="field" :class="{ tabbed: tabbed }">{{ field }}: </span>
  <span>{{ info }}</span>
  <br />
</template>

<script>
export default {
  name: "InspectorField",
  props: {
    field: null,
    info: null,
    tabbed: {
      required: false,
    },
  },
};
</script>

<style scoped>
.field {
  color: var(--accent-color);
  margin-left: 0.7em;
}

.tabbed {
  margin-left: 1.4em;
}
</style>
