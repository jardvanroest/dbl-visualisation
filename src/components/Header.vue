<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="redirectToHome()">
        <img src="../assets/fonticon/graph.svg" alt="logo" />
        <span>WebVis</span>
      </div>
      <div class="import_data">
        <div>
          <img src="../assets/fonticon/upload.svg" alt="upload" />
          <span>{{ upload_text }}</span>
        </div>
      </div>
      <div class="nav_icons">
        <ul>
          <li @click="$emit('toggle-settings')">
            <!-- FLATICON NOT WORKING <i class="flaticon-information"></i> -->
            <img src="../assets/fonticon/settings.svg" alt="settings" />
          </li>
          <li @click="screenshot()">
            <img src="../assets/fonticon/import.svg" alt="screenshot" />
          </li>
          <li @click="redirectToInfo()">
            <img src="../assets/fonticon/info.svg" alt="information" />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Visualisation",
  components: {},
  data() {
    return {
      upload_text: "Start visualising...",
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push({ path: "/" });
    },
    redirectToInfo() {
      this.$router.push({ path: "/info" });
    },
    screenshot() {
      console.log("screenshot");
    },
  },
};
</script>

<style scoped>
* {
  transition: all ease-in-out 300ms;
}

/* Format header */
.container {
  width: 100%;
  height: 50px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}

.container img {
  width: 24px;
  height: 24px;
}

.container div {
  cursor: pointer;
}

/* Format logo div*/
.logo {
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
}

.logo img {
  padding-right: 1em;
  width: 44px;
  height: 44px;
}

.logo span {
  font-size: 22pt;
}

/* Format upload div*/
.import_data div {
  display: flex;
  align-items: center;
}

.import_data img {
  padding: 1em;
}

.import_data span {
  transition: none;
  padding-right: 1em;
}

/* Format icons to the right*/
.nav_icons ul {
  list-style-type: none;
  display: table;
  position: relative;
}

.nav_icons li {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: transparent;

  height: 50px;
  width: 50px;
}

/* Color image white and background var(--accent-color) when hovered */
.nav_icons ul :hover,
.nav_icons ul :focus,
.import_data :hover,
.import_data :focus {
  background: var(--accent-color);
  color: white;
}
.nav_icons li:hover img,
.import_data:hover img {
  filter: invert(1);
}

.nav_icons li img,
.import_data img,
.import_data span {
  pointer-events: none;
}
</style>
