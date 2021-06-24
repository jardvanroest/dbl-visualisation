<template>
  <div class="setting-cont" :class="{ flexRow: flexRow === 'yes' }">
    <p>{{ name }}:</p>
    <hr />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: null,
    flexRow: {
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.setting-cont {
  --margin-p: 1em 0 0 0.5em;
  display: flex;
  flex-direction: column;
}

.flexRow {
  flex-direction: row;
  align-items: center;
  gap: 1em;
}

.flexRow hr {
  display: none;
}

.setting-cont p {
  font-size: 1rem;
  margin: var(--margin-p);
}

/* Style horizontal lines */
hr {
  width: 75%;
  margin: 3px 2em 0.5em 0em;
  border: none;
  border-top: 1px solid var(--border-color);
}
</style>
