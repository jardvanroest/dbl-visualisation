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
  padding: 1em 0;
  padding-left: 15px;
  height: 100%;

  font-size: 10pt;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
