<template>
  <Btn @click="toggleMenu" text="placeholder" />
</template>

<script>
import { mapGetters } from "vuex";
import Btn from "@/components/buttons/Btn.vue";

export default {
  name: "VisualisationSettings",
  components: {
    Btn,
  },
  computed: {
    ...mapGetters("dataset", ["getDatasetLink"]),
  },
  methods: {
    toggleMenu() {},
  },
};
</script>

<style lang="scss" scoped></style>
