<template>
  <div>
    <select v-model="selected_type">
      <option selected disabled>Choose visualisation</option>
      <option value="AdjacencyMatrix">Adjacency Matrix</option>
      <option value="NodeLink">Node Link</option>
      <option value="TestVis">Test Visualisation</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  data: function () {
    return {
      selected_type: undefined,
    };
  },
  watch: {
    selected_type: {
      deep: true,
      handler(value) {
        this.$emit("changed", value);
      },
    },
  },
};
</script>

<style scoped></style>
