<template>
  <div class="interaction-mode-container">
    <DropDown
      class="dropdown"
      selected="inspect"
      :items="dropdownItems"
      @changed="changeInteractionMode"
    />
  </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";
import { mapActions } from "vuex";

export default {
  name: "InteractionMode",
  computed: {},
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        { value: "inspect", name: "Inspection" },
        { value: "select", name: "Selection" },
      ],
    };
  },
  methods: {
    ...mapActions("brush_and_link", ["updateInteractionMode"]),
    changeInteractionMode(value) {
      this.updateInteractionMode(value);
    },
  },
};
</script>

<style scoped lang="scss">
.interaction-mode-container {
  display: flex;
}
</style>
