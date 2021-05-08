<template>
  <div class="container">
    {{ text }}
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
