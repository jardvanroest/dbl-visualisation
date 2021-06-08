<template>
  <div class="inspector">
    <div v-if="nodeHasBeenClicked" class="inspector-container">
      <Section
        v-for="(s, i) in data"
        :key="s"
        :title="s.section"
        :fields="s.fields"
        :index="i"
      />
    </div>
    <div v-else class="no-information inspector-container">
      Try clicking on a node or an edge to display information about it!
      <img src="@/assets/icons/analysis.svg" alt="upload" />
    </div>
  </div>
</template>

<script>
import Section from "@/components/inspector/Section.vue";
import { mapGetters } from "vuex";

export default {
  name: "Inspector",
  components: {
    Section,
  },
  computed: {
    ...mapGetters("dataset", [
      "getInspectorData",
      "emails",
      "persons",
      "filteredEmails",
    ]),
  },
  watch: {
    // Watch for a new incoming {inspectorData}
    getInspectorData(newData) {
      this.incomingNewData(newData);
    },

    filteredEmails: {
      deep: true,
      handler() {
        // Reset inspector on filtering
        this.nodeHasBeenClicked = false;
      },
    },
  },
  data() {
    return {
      nodeHasBeenClicked: false,
      emailsExist: false,
      data: [{ section: "none", field: "none" }],
      sections: null,
      fields: null,
      tabbed: null,
      newData: null,
    };
  },
  methods: {
    incomingNewData(newData) {
      this.newData = newData;
      this.nodeHasBeenClicked = true;
      this.resetData();

      // Get all section names correctly formatted
      this.sections = Object.keys(this.newData);

      // Get all fields
      for (let i = 0; i < this.sections.length; i++) {
        this.makeSectionObject(i);
        this.fields = Object.keys(this.newData[this.sections[i]]);

        for (let j = 0; j < this.fields.length; j++) {
          if (this.fields[j] === "tabbed") {
            this.tabbed = Object.keys(this.newData[this.sections[i]].tabbed);

            for (let k = 0; k < this.tabbed.length; k++) {
              this.makeTabbedField(i, j, k);
            }
          } else {
            this.makeNormalField(i, j);
          }
        }
      }
    },
    resetData() {
      this.data = [];
    },
    makeSectionObject(i) {
      this.data.push({
        section: this.formatValue(this.sections[i]),
        fields: [],
      });
    },
    makeTabbedField(i, j, k) {
      this.data[i].fields.push({
        field: this.tabbed[k],
        info: this.newData[this.sections[i]][this.fields[j]][this.tabbed[k]],
        tabbed: true,
      });
    },
    makeNormalField(i, j) {
      this.data[i].fields.push({
        field: this.formatValue(this.fields[j]),
        info: this.newData[this.sections[i]][this.fields[j]],
        tabbed: false,
      });
    },
    formatValue(val) {
      // Replaces underscores with spaces
      return this.titleCase(val.replaceAll("_", " "));
    },
    titleCase(str) {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        if (splitStr[i] !== "and") {
          splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
      }
      // Directly return the joined string
      return splitStr.join(" ");
    },
  },
};
</script>

<style scoped lang="scss">
.inspector-container {
  padding-left: 5%;
  font-size: 0.95rem;
  height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
}

/* Format text at the beginning */
.no-information {
  font-size: 1rem;
  overflow: hidden;
}

.no-information img {
  margin-left: 3.125rem;
  margin-top: 0.625rem;
  width: 60%;
}
</style>
