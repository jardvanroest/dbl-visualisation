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
