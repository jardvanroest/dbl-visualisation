<template>
  <header>
    <div class="container">
      <div class="logo">
        <img src="../assets/fonticon/graph.svg" alt="logo" />
        <span>WebVis</span>
      </div>
      <div class="import_data">
        <img src="../assets/fonticon/upload1.svg" alt="upload" />
        <Btn class="upload_btn" text="Upload a dataset" />
      </div>
      <div class="nav_icons">
        <ul>
          <li>
            <img src="../assets/fonticon/settings.svg" alt="settings" />
          </li>
          <li>
            <img src="../assets/fonticon/import.svg" alt="screenshot" />
          </li>
          <li>
            <img src="../assets/fonticon/info1.svg" alt="information" />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Btn from "@/components/Btn.vue";

export default {
  name: "Visualisation",
  components: {
    Btn,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  transition: all ease-in-out 300ms;
}

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

.container div div {
  cursor: pointer;
}

/* Format logo div*/
.logo {
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
.import_data {
  display: flex;
  align-items: center;
}

.import_data img {
  padding: 1em;
}

/* Format icons to the right*/
.nav_icons ul {
  list-style-type: none;
  display: table;
  position: relative;
}

.nav_icons ul :hover,
:focus {
  background: #73cdc2;
}

.nav_icons li {
  display: table-cell;
  vertical-align: middle;
  text-align: center;

  height: 50px;
  width: 50px;
}

/*
.nav_icons li::after {
  content: "";
  display: block;
  background-color: black;

  position: absolute;
  top: 48px;
  width: 0;
  height: 3px;
}

.nav_icons li:hover::after,
.nav_icons li:focus::after {
  width: 33%;
}
*/
</style>
