<template>
  <div class="interaction-mode-container">
    <DropDown
      class="dropdown"
      selected="inspection"
      :items="dropdownItems"
      @changed="changeInteractionMode"
    />
  </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
  name: "InteractionMode",
  computed: {},
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        { value: "inspection", name: "Inspection" },
        { value: "selection", name: "Selection" },
      ],
    };
  },
  methods: {
    changeInteractionMode(value) {
      // TODO: implement this
      console.log(value);
    },
  },
};
</script>

<style scoped lang="scss">
.interaction-mode-container {
  display: flex;
}
</style>
