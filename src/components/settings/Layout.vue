<template>
  <div class="layout-container">
    <Setting name="Show grid outline" flexRow="yes">
      <input
        type="checkbox"
        name="checkbox"
        class="cb-outline"
        @change="toggleGridOutline"
      />
    </Setting>
    <Setting name="Visualisations" flexRow="yes">
      <DropDown
        class="dropdown"
        :selected="2"
        :items="createDropDownObj(16)"
        @changed="changeVisAmount"
      />
    </Setting>
    <Setting class="columns-cont" name="Columns" flexRow="yes">
      <DropDown
        class="dropdown"
        :selected="2"
        :items="createDropDownObj(4)"
        @changed="changeColumnNum"
      />
    </Setting>
    <Setting class="rows-cont" name="Rows" flexRow="yes">
      <DropDown
        class="dropdown"
        :selected="1"
        :items="createDropDownObj(4)"
        @changed="changeRowNum"
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
    changeVisAmount(amount) {
      this.$emit("change-vis-amount", amount);
    },
    changeColumnNum(number) {
      this.$emit("change-column-num", number);
    },
    changeRowNum(number) {
      this.$emit("change-row-num", number);
    },
    toggleGridOutline(e) {
      let visCont = document.getElementById("vis-cont");
      if (e.target.checked) visCont.classList.add("outlined");
      else visCont.classList.remove("outlined");
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
  --margin-p: 0.4em 0 0.4em 0.4em !important;
}

input.cb-outline {
  transform: scale(1.25);
  -ms-transform: scale(1.25);
  -webkit-transform: scale(1.25);
  -o-transform: scale(1.25);
  -moz-transform: scale(1.25);
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
}

/* Show visualisations as one column on smaller screen sizes and
   remove options to change amount of grid columns and rows */
@media (max-width: 525px) {
  .rows-cont,
  .columns-cont {
    display: none;
  }
}
</style>
