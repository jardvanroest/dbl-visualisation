<template>
  <div class="container">
    <div v-if="emailsExist">
      <div class="section">Sender</div>
      <hr />
      <inspectorField field="Email" :info="email['fromEmail']" />
      <inspectorField field="Id" :info="email['fromId']" />
      <inspectorField field="Job" :info="email['fromJobtitle']" />
      <div class="section">Recipient</div>
      <hr />
      <inspectorField field="Email" :info="email['toEmail']" />
      <inspectorField field="Id" :info="email['toId']" />
      <inspectorField field="Job" :info="email['toJobtitle']" />
      <div class="section">Additional information</div>
      <hr />
      <inspectorField field="Emails" :info="newData['weight']" />
      <inspectorField v-if="!sameDate" field="First date" :info="minDate" />
      <inspectorField v-if="!sameDate" field="Last date" :info="maxDate" />
      <inspectorField v-if="sameDate" field="Date" :info="minDate" />
      <inspectorField field="Average sentiment" :info="avgSentiment" />
      <div class="nodeColor">
        <inspectorField field="Node color" :info="nodeColor" />
        <svg>
          <rect
            v-bind:style="{ fill: nodeColor }"
            width="100%"
            height="100%"
            rx="2"
            ry="2"
          ></rect>
        </svg>
      </div>
    </div>
    <div v-else>Click on a node to dislay information about it!</div>
  </div>
</template>

<script>
import InspectorField from "@/components/InspectorField.vue";
import { mapGetters } from "vuex";

export default {
  name: "Inspector",
  components: {
    InspectorField,
  },
  computed: {
    ...mapGetters(["getInspectorData"]),
  },
  watch: {
    // Watch for a new incoming {inspectorData}
    getInspectorData(newData) {
      this.incomingNewData(newData);
    },
  },
  data() {
    return {
      emailsExist: false,
      title: "Email correspondance",
      newData: "none",
      email: "none",
      nodeColor: "#FFFFFF",
      dates: [],
      minDate: 0,
      maxDate: 0,
      sameDate: false,
      avgSentiment: 0,
      sentiments: [],
      messageTypes: [],
    };
  },
  methods: {
    incomingNewData(newData) {
      const dataset = this.$store.state.dataset.getRawData();

      this.emailsExist = newData["weight"] > 0;
      this.email = dataset[newData["dataIndex"][0]];
      this.newData = newData;
      this.nodeColor = newData["fillColor"].toLowerCase();

      // If the two people have sent emails between eachother
      if (this.emailsExist) {
        // Reset dates
        this.dates = [];
        this.maxDate = new Date("1001-01-01");
        this.minDate = new Date("3001-01-01");

        newData["dataIndex"].forEach((index) => {
          // Get all sentiments and messageTypes
          this.sentiments.push(parseFloat(dataset[index]["sentiment"]));
          this.messageTypes.push(dataset[index]["messageType"]);

          // Get all dates and calculate the first and last one
          var currentDate = new Date(dataset[index]["date"]);
          this.dates.push(currentDate.toDateString());

          if (currentDate < this.minDate) this.minDate = currentDate;
          if (currentDate > this.maxDate) this.maxDate = currentDate;
        });
        // Check if same date
        if (this.minDate === this.maxDate) this.sameDate = true;
        else this.sameDate = false;

        // Convert dates to correct format
        this.minDate = this.minDate.toDateString();
        this.maxDate = this.maxDate.toDateString();

        // Get average sentiment
        const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
        this.avgSentiment = arrAvg(this.sentiments).toPrecision(3);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-left: 15px;
  padding-bottom: 25px;
  font-size: 10pt;

  overflow-y: auto;
  overflow-x: hidden;
}

/* Make color rectangle */
.nodeColor {
  display: flex;
}

.nodeColor svg {
  width: 0.9em;
  height: 0.9em;
  margin: auto 0;
  margin-left: 0.5em;
}

.nodeColor svg rect {
  fill: blue;
}

/* Style horizontal lines */
hr {
  margin-top: 3px;
  margin-bottom: 1px;
  margin-right: 5px;
  border: none;
  border-top: 1px solid var(--border-color);
}

/* Format sections */
.section {
  margin-top: 1em;

  font-weight: bold;
  font-size: 12pt;
  text-transform: capitalize;
  color: var(--accent-color);
}
</style>
