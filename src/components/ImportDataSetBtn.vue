<template>
  <div v-bind:class="{ hidden: isActive }">
    <p v-on:click="importFile">Import dataset (.csv)</p>
    <input type="file" class="hidden" ref="fileInput" @change="onPickedFile" />
  </div>
  <div class="progress" v-bind:class="{ hidden: !isActive }">
    <KProgress class="progress_bar" :percent="percent" />
  </div>
</template>

<script>
import KProgress from "k-progress-v3";

export default {
  name: "ImportDataSetBtn",
  components: {
    KProgress,
  },
  watch: {
    percent: {
      handler: function () {
        if (this.percent == 100) {
          this.isActive = false;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      isActive: false,
      percent: 0,
      objectives: 0,
      acceptableFormats: [
        "application/vnd.ms-excel",
        "application/text",
        "text/plain",
      ],
    };
  },
  methods: {
    importFile() {
      this.$refs.fileInput.click();
    },
    onPickedFile(event) {
      const file = event.target.files[0];
      if (!this.acceptableFormats.includes(file.type)) {
        throw "file not supported"; //throw err
      }
      this.isActive = true;
      console.log(file.type);
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = (evt) => {
        this.isActive = true;
        this.saveData(evt.target.result).catch((e) => {
          console.log(e);
        });
        this.isActive = false;
      };
      reader.onerror = (evt) => {
        console.error(evt);
        this.isActive = false;
      };
    },
    async saveData(data) {
      this.$store.state.tables.push(this.returnTable_JSON(data));
      this.percent = 0;
    },
    returnTable_JSON(txt) {
      let arr_all = txt.split("\n");
      let keys = arr_all[0].split(","); //colums names
      keys.map((k) => k.trim()); //column names
      let objects = [];
      for (let i = 1; i < arr_all.length; i++) {
        let data = arr_all[i].split(",");
        let obj = {};
        for (let j = 0; j < data.length; j++) {
          obj[keys[j]] = data[j].trim();
        }

        objects.push(obj);
        this.percent = this.getPercent(i, arr_all.length);
      }
      this.percent = 100;
      this.objectives = 0;
      return objects;
    },
    getPercent(curr, max) {
      if (curr / max > 99) {
        if (this.objectives < 5) {
          this.objectives++;
        }
        return 99;
      } else if (curr / max > 75) {
        if (this.objectives < 4) {
          this.objectives++;
        }
        return 75;
      } else if (curr / max > 50) {
        if (this.objectives < 3) {
          this.objectives++;
        }
        return 50;
      } else if (curr / max > 25) {
        if (this.objectives < 2) {
          this.objectives++;
        }
        return 25;
      } else if (curr / max > 10) {
        if (this.objectives < 1) {
          this.objectives++;
        }
        return 10;
      }
    },
  },
};
</script>

<style scoped lang="scss">
p {
  color: white;
  background-color: #769ad5;
  font-weight: 600;
  padding: 10px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &:hover {
    background-color: #6180b1;
    cursor: pointer;
  }
}

.hidden {
  display: none;
}
.progress_bar {
  width: 100%;
}
.progress_components {
  //display: auto;
}
</style>
