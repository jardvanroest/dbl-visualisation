<template>
  <div class="container-settingType">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Settings",
};
</script>

<style scoped>
.container-settingType {
  padding-left: 15px;
  margin: 1em 0;
  height: 100%;

  font-size: 10pt;
  background-color: lemonchiffon;

  overflow-y: auto;
  overflow-x: hidden;
}
</style>
