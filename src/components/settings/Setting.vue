<template>
  <div class="setting-cont" :class="{ flexRow: flexRow === 'yes' }">
    <p>{{ name }}:</p>
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
}
</style>
