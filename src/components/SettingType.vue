<template>
  <div class="container">
    {{ text }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Settings",
  props: {
    text: String,
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  background-color: lemonchiffon;
  padding-left: 4px;
}
</style>
