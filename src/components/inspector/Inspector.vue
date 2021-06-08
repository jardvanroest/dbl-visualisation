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
    };
  },
  methods: {
    incomingNewData(newData) {
      this.nodeHasBeenClicked = true;
      this.resetData();

      // Get all section names correctly formatted
      let _sections = Object.keys(newData);

      // Get all fields
      for (let i = 0; i < _sections.length; i++) {
        // Make an object for each section
        this.data.push({ section: this.formatValue(_sections[i]), fields: [] });

        let _fields = Object.keys(newData[_sections[i]]);
        for (let j = 0; j < _fields.length; j++) {
          if (_fields[j] === "tabbed") {
            let _tabbed = Object.keys(newData[_sections[i]].tabbed);
            for (let k = 0; k < _tabbed.length; k++) {
              this.data[i].fields.push({
                field: _tabbed[k],
                info: newData[_sections[i]][_fields[j]][_tabbed[k]],
                tabbed: true,
              });
            }
          } else {
            this.data[i].fields.push({
              field: this.formatValue(_fields[j]),
              info: newData[_sections[i]][_fields[j]],
              tabbed: false,
            });
          }
        }
      }
    },
    resetData() {
      this.data = [];
    },
    formatValue(val) {
      // Replaces underscores with spaces
      return this.titleCase(val.replaceAll("_", " "));
    },
    titleCase(str) {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        if (splitStr[i] != "and" || splitStr[i] != "in") {
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
