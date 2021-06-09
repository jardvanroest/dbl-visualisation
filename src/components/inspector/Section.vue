<template>
  <div class="section" :class="{ first: index === 0 }">{{ title }}</div>
  <hr />
  <div v-if="fields != 'none'">
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
  font-size: 1.2rem;
  color: var(--accent-color);
}

.first {
  margin-top: 0;
}

/* Style horizontal lines */
hr {
  width: calc(100% - 1rem);
  margin-top: 3px;
  margin-bottom: 1px;
  margin-right: 1rem;
  border: none;
  border-top: 1px solid var(--border-color);
}
</style>
