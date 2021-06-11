<template>
  <div class="layout-container">
    <Setting name="Amount" flexRow="yes">
      <DropDown
        class="dropdown"
        :selected="2"
        :items="createDropDownObj(16)"
        @changed="changeAmount"
      />
    </Setting>
    <Setting class="columns-cont" name="Columns" flexRow="yes">
      <DropDown
        class="dropdown"
        :selected="2"
        :items="createDropDownObj(4)"
        @changed="idk"
      />
    </Setting>
    <Setting class="rows-cont" name="Rows" flexRow="yes">
      <DropDown
        class="dropdown"
        :selected="1"
        :items="createDropDownObj(4)"
        @changed="idk"
      />
    </Setting>
  </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";
import Setting from "@/components/settings/Setting.vue";

// TODO: --vis-nums := number of visualisations (remember to change)

export default {
  name: "Layout",
  components: {
    DropDown,
    Setting,
  },
  data() {
    return {
      visDimObj: this.createDropDownObj(4),
      visNumObj: this.createDropDownObj(16),
    };
  },
  methods: {
    changeAmount(amount) {
      this.$emit("change-amount", amount);
    },
    idk() {
      console.log("idk");
    },
    createDropDownObj(maxNum) {
      var list = [];
      for (let i = 1; i <= maxNum; i++) {
        list.push({ value: i, name: i });
      }
      return list;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  font-size: 0.8125rem;
}

.dropdown {
  font-size: 0.625rem !important;
}

.setting-cont {
  --margin-p: 0.5em 0 0.5em 0.5em !important;
}

/* Show visualisations as one column on smaller screen sizes and
   remove options to change amount of grid columns and rows */
@media (max-width: 1000px) {
  .rows-cont,
  .columns-cont {
    display: none;
  }
}
</style>
