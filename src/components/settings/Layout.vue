<template>
  <div class="layout-container">
    <div class="rows-cont">Rows: yup</div>
    <div class="columns-cont">Columns: yup</div>
    <div class="show-calendar">Calendar: yes/no</div>
  </div>
</template>

<script>
//import DropDown from "@/components/DropDown.vue";

// TODO: --vis-nums := number of visualisations (remember to change)

export default {
  name: "Layout",
  components: {
    //DropDown,
  },
  data() {
    return {
      idk: 0,
    };
  },
  methods: {
    someMethod() {
      console.log(1);
    },
  },
};
</script>

<style lang="scss">
.layout-container {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

/* Show visualisations as one column on smaller screen sizes and
   remove options to change amount of grid columns and rows */
@media (max-width: 1000px) {
  :root {
    --grd-cols: 1;
    --grd-rows: var(--vis-nums);
  }
  .rows-cont,
  .columns-cont {
    display: none;
  }
}
</style>
