<template>
  <div :class="{ smallerText: tabbed, color: field === 'Node Color' }">
    <span class="field" :class="{ tabbed: tabbed }">{{ field }}: </span>
    <span>{{ info }} </span>
    <span
      v-if="field === 'Node Color'"
      class="color"
      :style="{ background: info }"
    />
  </div>
</template>

<script>
export default {
  name: "InspectorField",
  props: ["field", "info", "tabbed"],
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

.smallerText {
  font-size: 9pt;
}

/* Make color rectangle */
div.color {
  display: flex;
  flex-direction: row;
}
span.color {
  display: block;
  content: "";
  width: 0.85em;
  height: 0.85em;
  margin: auto 0;
  margin-left: 0.5em;
  border-radius: 25%;
}
</style>
