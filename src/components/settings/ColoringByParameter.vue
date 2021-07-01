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
import { mapActions } from "vuex";

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
    //...mapActions("coloring", ["updateColoringMode"]),
    changeColoringMode(value) {
      console.log(4);
      this.$emit("updateColor", value);
    },
    //updateColoringMode(value)
  },
};
</script>

<style scoped lang="scss">
.interaction-mode-container {
  display: flex;
}
</style>
