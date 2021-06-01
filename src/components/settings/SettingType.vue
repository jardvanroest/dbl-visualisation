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
  padding-left: 5%;
  height: calc(100% - 2em);

  font-size: 10pt;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
