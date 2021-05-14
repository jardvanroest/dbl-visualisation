<template>
  <div class="container">
    <div v-if="emailsExist">
      <div class="section">Sender</div>
      <hr />
      <div>From: {{ email["fromEmail"].slice(0, -10) }}</div>
      <div>ID: {{ email["fromId"] }}</div>
      <div>Job title: {{ email["fromJobtitle"] }}</div>
      <div class="section">Recipient</div>
      <hr />
      <div>To: {{ email["toEmail"].slice(0, -10) }}</div>
      <div>ID: {{ email["toId"] }}</div>
      <div>Job title: {{ email["toJobtitle"] }}</div>
      <div class="section">Additional information</div>
      <hr />
      <div>Date: {{ email["date"] }}</div>
      <div>Emials sent: {{ newData["weight"] }}</div>
      <div>Average sentiment: {{ averageSentiment }}</div>
      <div class="nodeColor">
        <div>Node color: {{ nodeColor.toLowerCase() }}</div>
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
    <div v-else>No emails have been sent between these two people!</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Inspector",
  computed: {
    ...mapGetters(["getInspectorData"]),
  },
  // created() {
  //   this.incomingNewData(this.displayedData);
  // },
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
      averageSentiment: 0,
      nodeColor: "#FFFFFF",
    };
  },
  methods: {
    incomingNewData(newData) {
      const dataset = this.$store.state.dataset.getRawData();
      console.clear();
      console.log(newData);

      this.emailsExist = newData["weight"] > 0;
      this.email = dataset[newData["dataIndex"][0]];
      this.newData = newData;
      this.nodeColor = newData["fillColor"];
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-left: 15px;
  padding-bottom: 25px;
  font-size: 10pt;

  overflow-y: scroll;
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
  margin-right: 5px;
  border: none;
  border-top: 1px solid var(--border-color);
}

/* Format sections */
.section {
  margin-top: 1em;

  font-weight: bold;
  font-size: 12pt;
  color: var(--accent-color);
}
</style>
