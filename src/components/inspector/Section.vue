<template>
  <div class="section" :class="{ first: index === 0 }">{{ title }}</div>
  <hr />
  <div>
    <InspectorField
      v-for="f in fields"
      :key="f"
      :field="f.field"
      :tabbed="f.tabbed"
      :info="f.info"
    />
  </div>
</template>

<script>
import InspectorField from "@/components/inspector/InspectorField.vue";

export default {
  name: "Section",
  components: {
    InspectorField,
  },
  props: ["title", "fields", "index"],
};
</script>

<style scoped>
/* Format section titles */
.section {
  margin-top: 0.8em;

  font-weight: bold;
  font-size: 12pt;
  color: var(--accent-color);
}

.first {
  margin-top: 0;
}

/* Style horizontal lines */
hr {
  margin-top: 3px;
  margin-bottom: 1px;
  margin-right: 5px;
  border: none;
  border-top: 1px solid var(--border-color);
}
</style>
