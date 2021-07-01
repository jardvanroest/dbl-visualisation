<template>
  <div class="interaction-mode-container">
    <DropDown
      class="dropdown"
      selected="byEmails"
      :items="dropdownItems"
      @changed="changeColoringMode"
    />
  </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
  name: "ColoringByParameter",
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        { value: "byEmails", name: "Emails" },
        { value: "bySentiment", name: "Sentiment" },
      ],
    };
  },
  methods: {
    changeColoringMode(value) {
      this.$emit("updateColor", value);
    },
  },
};
</script>

<style scoped lang="scss">
.interaction-mode-container {
  display: flex;
}
</style>
