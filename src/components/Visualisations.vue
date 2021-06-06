<template>
  <div class="visualisations-cont">
    <Visualisation class="visualisation" id="vis1" />
    <Visualisation class="visualisation" id="vis2" />
  </div>
</template>

<script>
import Visualisation from "@/components/Visualisation.vue";

export default {
  name: "Visualisations",
  components: {
    Visualisation,
  },
};
</script>

<style scoped lang="scss">
.visualisations-cont {
  display: grid;
  grid-auto-flow: column;
}

.visualisations-cont .visualisation {
  --margin-size: 0.75rem;

  position: relative;
  margin: var(--margin-size);
  margin-left: 0;
  padding: 0.25rem;

  border-radius: var(--border-rad);
  background-color: var(--background-color);
  box-shadow: 0 0 0 2px var(--background-color),
    rgba(50, 50, 93, 0.25) 2px 4px 5px -1px, rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;

  &:hover {
    box-shadow: 0 0 0 2px var(--accent-color),
      rgba(50, 50, 93, 0.25) 2px 4px 5px -1px,
      rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;
  }
}

.visualisations-cont *:first-child {
  margin-left: var(--margin-size);
}
</style>
