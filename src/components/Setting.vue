<template>
  <h4>{{ name }}</h4>
  <slot></slot>
</template>

<script>
export default {
  props: ["name"],
};
</script>
