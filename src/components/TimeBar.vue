<template>
  <div class="line"></div>
</template>

<script>
export default {
  name: "TimeBar",
  props: ["dates"],
  watch: {
    dates: {
      deep: true,
      handler(value) {
        console.log("dates!");
      },
    },
  },
};
</script>

<style>
.line {
  border-bottom: 6px solid green;
  width: 500px;
}
</style>
