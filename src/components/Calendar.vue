<template>
  <div style="text-align: center">
    <br />
    <div id="area_cal" ref="container" style="padding: 30px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
//import { legend } from "d3/color-legend";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calendar",
  computed: {
    ...mapGetters("dataset", [
      "filteredEmails",
      "numberOfPersons",
      "getPersonById",
      "getRangeYears",
    ]),
  },
  data() {
    return {
      weekday: "monday",
    };
  },
  watch: {
    filteredEmails: {
      deep: true,
      handler() {
        this.resetCalendar();
        this.generateCalendar();
      },
    },
  },
  mounted() {
    this.generateCalendar();
  },
  methods: {
    ...mapActions("dataset", ["changeInspetorData"]),
    generateCalendar() {
      let parsedData = this.groupData(this.filteredEmails);
      console.log(parsedData);
      let cellSize = 17;
      let width = 954;
      let height = cellSize * (this.weekday === "weekday" ? 7 : 9);
      let countDay = this.weekday === "sunday" ? (i) => i : (i) => (i + 6) % 7;
      //let timeWeek = this.weekday === "sunday" ? d3.utcSunday : d3.utcMonday;
      //let formatValue = d3.format("+.2%");
      //let formatClose = d3.format("$,.2f");
      let formatDay = (i) => "SMTWTFS"[i];
      //let formatMonth = d3.utcFormat("%b");
      // let color = (d) => {
      //   const max = d3.quantile(parsedData, 0.9975, d.emails);
      //   return d3.scaleSequential(d3.interpolatePiYG).domain([-max, +max]);
      // };
      const svg = d3
        .select("#area_cal")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet") // TODO: sizing is weird because of this ?
        .attr("viewBox", [0, 0, width, height * parsedData.length])
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .classed("svg-content", true);
      const year = svg
        .selectAll("g")
        .data(parsedData)
        .join("g")
        .attr(
          "transform",
          (d, i) => `translate(40.5,${height * i + cellSize * 1.5})`
        );
      year
        .append("text")
        .attr("x", -5)
        .attr("y", -5)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(([key]) => key);
      year
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d3.range(7))
        .join("text")
        .attr("x", -5)
        .attr("y", (i) => (countDay(i) + 0.5) * cellSize)
        .attr("dy", "0.31em")
        .text(formatDay);

      year
        .append("g")
        .selectAll("rect")
        .data(([, values]) => values)
        .join("rect")
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1)
        .attr(
          "x",
          (d) => d3.utcMonday.count(d3.utcYear(d.date), d.date) * cellSize + 0.5
        )
        .attr("y", (d) => countDay(d.date.getUTCDay()) * cellSize + 0.5)
        .attr("fill", (d) => this.color(d.numberEmails))
        .attr("opacity", (d) => d.numberEmails / 5)
        //.append("title")
        .on("click", (e, d) => {
          return console.log(d);
        })
        .text((d) => d.numberEmails);
      //   .text(
      //     (d) => `${this.formatDate(d.date)}
      // ${formatValue(d.sentiment)}${
      //       d.sentiment === undefined
      //         ? ""
      //         : `
      // ${formatClose(d.sentiment)}`
      //     }`
      //   );
    },
    resetCalendar() {
      d3.select("svg").remove();
    },
    // numberWithCommas(x) {
    //   x = x.toString();
    //   var pattern = /(-?\d+)(\d{3})/;
    //   while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    //   return x;
    // },
    // pathMonth(t, timeWeek, cellSize, countDay) {
    //   const n = this.weekday === "weekday" ? 5 : 7;
    //   const d = Math.max(0, Math.min(n, countDay(t.getUTCDay())));
    //   const w = timeWeek.count(d3.utcYear(t), t);
    //   return `${
    //     d === 0
    //       ? `M${w * cellSize},0`
    //       : d === n
    //       ? `M${(w + 1) * cellSize},0`
    //       : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
    //   }V${n * cellSize}`;
    // },
    groupData(set) {
      let group = d3.groups(set, (d) => d.date.getUTCFullYear()).sort();
      for (let i = 0; i < group.length; i++) {
        //console.log(this.parseDates(group[i][1]));
        group[i][1] = this.parseDates(group[i][1]);
      }
      return group;
    },
    parseDates(arrDates) {
      let returnObj = [];
      for (let i = 0; i < arrDates.length; i++) {
        let exist = returnObj.some(
          (e) => e.date.getTime() == arrDates[i].date.getTime()
        );
        //console.log(exist);
        if (exist) {
          try {
            let found = returnObj.find(
              (e) => e.date.getTime() == arrDates[i].date.getTime()
            );
            found.numberEmails++;
            found.emails.push(arrDates[i]);
          } catch (e) {
            console.log(arrDates[i].date.getDay());
          }
        } else {
          returnObj.push({
            date: arrDates[i].date,
            numberEmails: 1,
            emails: [arrDates[i]],
          });
        }
      }
      return returnObj;
    },
    getAvgValue(array) {
      // Gets avarage value in an array
      const AvgVal = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      return AvgVal(array);
    },
    color(number) {
      // return (
      //   "rgb(" + number * 1.5 + ", " + number * 0.8 + "," + number * 0.5 + ")"
      // );
      return (
        "rgb(" +
        number / 0.5 +
        ", " +
        /*number / 1.4 */ 98 +
        "," +
        /*number / 5 */ 98 +
        ")"
      );
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
