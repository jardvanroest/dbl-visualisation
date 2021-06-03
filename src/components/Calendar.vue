<template>
  <div style="text-align: center">
    <div id="area_calendar" ref="container" style="padding: 30px"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CalendarVisualisation } from "@/visualisations/calendar";

export default {
  name: "Calendar",
  data() {
    return {
      calendar: new CalendarVisualisation(this.changeInspectorData),
    };
  },
  computed: {
    ...mapGetters("dataset", ["filteredEmails", "getEmailsByDates"]),
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.redraw();
      },
    },
  },
  mounted() {
    this.redraw();
  },
  methods: {
    ...mapActions("dataset", ["changeInspetorData"]),
    redraw() {
      this.calendar.redraw(this.filteredEmails);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.chart {
  background: #fff;
  margin: 5px;
}
.tooltip {
  animation: fadeIn 1s;
}
.svg-content {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
