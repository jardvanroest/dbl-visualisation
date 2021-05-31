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
      const parsedData = this.groupData(this.filteredEmails);
      //console.log(parsedData);
      const cellSize = 17;
      const width = 954;
      const height = cellSize * (this.weekday === "weekday" ? 7 : 9);
      const countDay = (i) => (i + 6) % 7;
      const timeWeek = d3.utcMonday;
      //let formatValue = d3.format("+.2%");
      //let formatClose = d3.format("$,.2f");
      const formatDay = (i) => "SMTWTFS"[i];
      const formatMonth = d3.utcFormat("%b");

      const svg = d3
        .select("#area_cal")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", [0, 0, width, height * parsedData.length])
        .attr("font-family", "sans-serif")
        //.attr("display", "flexbox")
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
        .attr("fill", (d) => this.color(d.emails.length))
        .attr("opacity", (d) => d.emails.length / 5)
        //.append("title")
        .on("click", (e, d) => {
          return console.log(d);
        })
        .text((d) => d.emails.length);

      const month = year
        .append("g")
        .selectAll("g")
        .data(() => d3.utcMonths(new Date("1-1-2000"), new Date("12-12-2000")))
        .join("g");

      month
        .filter((d, i) => i)
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("d", (t) => {
          //console.log(t);
          const n = 7;
          const d = Math.max(0, Math.min(n, countDay(t.getUTCDay())));
          const w = timeWeek.count(d3.utcYear(t), t);
          return `${
            d === 0
              ? `M${w * cellSize},0`
              : d === n
              ? `M${(w + 1) * cellSize},0`
              : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
          }V${n * cellSize}`;
        });

      month
        .append("text")
        .attr(
          "x",
          (d) => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2
        )
        .attr("y", -5)
        // .on("click", (e, d) => {
        //   console.log(d);
        // })
        .text(formatMonth);
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
            returnObj
              .find((e) => e.date.getTime() == arrDates[i].date.getTime())
              .emails.push(arrDates[i]);
          } catch (e) {
            console.log(arrDates[i].date.getDay());
          }
        } else {
          returnObj.push({
            date: arrDates[i].date,
            emails: [arrDates[i]],
          });
        }
      }
      return returnObj;
    },
    getAvgValue(array) {
      // Gets avarage value in an array
      const AvgVal = (arr) =>
        arr.reduce((a, b) => a.sentiment + b.sentiment, 0) / arr.length;
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
    pathMonth(t, cellSize, timeWeek, countDay) {
      const d = Math.max(0, Math.min(7, countDay(t.getUTCDay())));
      const w = timeWeek.count(d3.utcYear(t), t);
      return `${
        d === 0
          ? `M${w * cellSize},0`
          : d === 7
          ? `M${(w + 1) * cellSize},0`
          : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
      }V${7 * cellSize}`;
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
