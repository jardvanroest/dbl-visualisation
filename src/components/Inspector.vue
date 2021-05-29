<template>
  <div class="inspector-container">
    <div v-if="nodeHasBeenClicked">
      <Section title="Sender" first="true" />
      <inspectorField field="Email" :info="sender['email']" />
      <inspectorField field="Id" :info="sender['id']" />
      <inspectorField field="Title" :info="sender['jobTitle']" />
      <Section title="Recipient" />
      <inspectorField field="Email" :info="recipient['email']" />
      <inspectorField field="Id" :info="recipient['id']" />
      <inspectorField field="Title" :info="recipient['jobTitle']" />
      <Section title="Additional information" />
      <div class="nodeColor">
        <inspectorField field="Node color" :info="nodeColor" />
        <svg>
          <rect
            v-bind:style="{ fill: nodeColor }"
            width="100%"
            height="100%"
            rx="2"
            ry="2"
          />
        </svg>
      </div>
      <inspectorField field="Emails" :info="numEmails" />
      <div v-if="emailsExist">
        <inspectorField field="TO" tabbed="true" :info="messageTypeTO" />
        <inspectorField field="CC" tabbed="true" :info="messageTypeCC" />
        <inspectorField v-if="!sameDate" field="From" :info="minDate" />
        <inspectorField v-if="!sameDate" field="Until" :info="maxDate" />
        <inspectorField v-if="sameDate" field="Date" :info="minDate" />
        <inspectorField field="Average sentiment" :info="avgSentiment" />
      </div>
    </div>
    <div v-else class="no-information">
      Try clicking on a node to display information about it!
      <img src="@/assets/icons/analysis.svg" alt="upload" />
    </div>
  </div>
</template>

<script>
import InspectorField from "@/components/InspectorField.vue";
import Section from "@/components/Section.vue";
import { mapGetters } from "vuex";

export default {
  name: "Inspector",
  components: {
    InspectorField,
    Section,
  },
  computed: {
    ...mapGetters("dataset", ["getInspectorData", "emails", "persons"]),
  },
  watch: {
    // Watch for a new incoming {inspectorData}
    getInspectorData(newData) {
      if (Number.isInteger(newData)) {
        console.log(newData); // TODO: decide what to do with labels
      } else {
        this.incomingNewData(newData);
      }
    },
  },
  data() {
    return {
      nodeHasBeenClicked: false,
      emailsExist: false,
      numEmails: 0,
      newData: "none",
      sender: "none",
      recipient: "none",
      nodeColor: "#FFFFFF",
      dates: [],
      minDate: 0,
      maxDate: 0,
      sameDate: false,
      sentiments: [],
      avgSentiment: 0,
      messageTypeCC: 0,
      messageTypeTO: 0,
    };
  },
  methods: {
    incomingNewData(newData) {
      this.nodeHasBeenClicked = true;

      this.newData = newData;
      this.numEmails = newData["weight"];
      this.emailsExist = newData["weight"] > 0;
      this.nodeColor = newData["fillColor"].toLowerCase();

      // Get sender and recipient information
      this.sender = newData.sender;
      this.recipient = newData.receiver;

      // If the two people have sent emails between eachother
      if (this.emailsExist) {
        this.computeEmailData(newData);
      }
    },
    computeEmailData(newData) {
      // Reset data to original values
      this.resetData();

      newData.emails.forEach((email) => {
        // Get all sentiments
        this.sentiments.push(email.sentiment);

        // Count different {messageTypes}
        this.messageTypesCount(email.messageType);

        // Get the current elements date and sort it
        this.sortDates(new Date(email.date));
      });
      this.formatDates();

      // Get average sentiment
      this.avgSentiment = this.getAvgValue(this.sentiments).toPrecision(3);
    },
    resetData() {
      this.dates = [];
      this.sentiments = [];

      this.messageTypeCC = 0;
      this.messageTypeTO = 0;

      // Set initial {minDate} and {maxDate}
      this.maxDate = new Date("1001-01-01");
      this.minDate = new Date("3001-01-01");
    },
    returnPersonObject(_person) {
      return {
        email: _person["emailAddress"],
        id: _person["id"],
        jobTitle: _person["jobTitle"],
        isSelectedInEmailFilter: _person["isSelectedInEmailFilter"],
      };
    },
    messageTypesCount(messageType) {
      if (messageType === "CC") this.messageTypeCC++;
      if (messageType === "TO") this.messageTypeTO++;
    },
    sortDates(currentDate) {
      this.dates.push(currentDate.toDateString());
      if (currentDate < this.minDate) this.minDate = currentDate;
      if (currentDate > this.maxDate) this.maxDate = currentDate;
    },
    formatDates() {
      // Check if its the same date
      if (this.minDate === this.maxDate) this.sameDate = true;
      else this.sameDate = false;

      // Convert dates to correct format
      this.minDate = this.formatDate(this.minDate);
      this.maxDate = this.formatDate(this.maxDate);
    },
    getAvgValue(array) {
      // Gets avarage value in an array
      const AvgVal = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      return AvgVal(array);
    },
    formatDate(date) {
      return date.toDateString().split(" ").slice(1).join(" ");
    },
  },
};
</script>

<style scoped lang="scss">
.inspector-container {
  display: table-cell;
  padding: 1em 0;
  padding-left: 15px;
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

/* Format text at the beginning */
.no-information {
  font-size: 12pt;
}

.no-information img {
  margin-left: 50px;
  margin-top: 10px;
  width: 150px;
}
</style>
