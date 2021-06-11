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

<style>
.setting-cont {
  display: flex;
  flex-direction: column;
}

.flexRow {
  flex-direction: row;
  align-items: center;
  gap: 1em;
}

.setting-cont p {
  font-size: 1rem;
  margin-left: 0.5em;
  margin-bottom: 0;
}

/* Style horizontal lines */
hr {
  width: 75%;
  margin: 3px 2em 0.5em 0em;
  border: none;
  border-top: 1px solid var(--border-color);
}
</style>
