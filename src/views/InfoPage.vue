<template>
  <h3>Info Page Placeholder</h3>
  <Btn @click="redirectToVisualisation" text="Back to visualisation" />
</template>

<script>
import Btn from "@/components/Btn.vue";

export default {
  name: "InfoPage",
  components: {
    Btn,
  },
  methods: {
    redirectToVisualisation() {
      this.$router.push({ path: "/visualisation" });
    },
  },
};
</script>
