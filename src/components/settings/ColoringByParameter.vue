<template>
  <div class="interaction-mode-container">
    <DropDown
      class="dropdown"
      selected="byDate"
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
  computed: {},
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        { value: "byDate", name: "Date" },
        { value: "bySentiment", name: "Sentiment" },
      ],
    };
  },
  methods: {
    ...mapActions("coloring", ["updateColoringMode"]),
    changeColoringMode(value) {
      this.updateColoringMode(value);
    },
  },
};
</script>

<style scoped lang="scss">
.interaction-mode-container {
  display: flex;
}
</style>
