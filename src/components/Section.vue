<template>
  <div class="section" :class="{ first: first }">{{ title }}</div>
  <hr />
</template>

<script>
export default {
  name: "Section",
  props: {
    title: null,
    first: {
      required: false,
    },
  },
};
</script>

<style scoped>
/* Format section titles */
.section {
  margin-top: 1em;

  font-weight: bold;
  font-size: 12pt;
  text-transform: capitalize;
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
