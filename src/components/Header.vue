<template>
  <header>
    <div class="container-header">
      <div class="logo" @click="redirectToHome()">
        <img src="@/assets/icons/logo.svg" alt="logo" />
        <span>MailVis</span>
      </div>
      <div class="nav_icons">
        <ul>
          <li @click="rotateSettings($event)">
            <img src="@/assets/icons/settings.svg" alt="settings" />
          </li>
          <li @click="showLinkPopup()">
            <img src="@/assets/icons/link.svg" alt="shareable link" />
          </li>
          <li @click="redirectToInfo()">
            <img src="@/assets/icons/info.svg" alt="information" />
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
      rotSett: false,
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push({ path: "/" });
    },
    redirectToInfo() {
      this.$router.push({ path: "/info" });
    },
    showLinkPopup() {
      this.$emit("toggle-popup");
    },
    rotateSettings(e) {
      // Add/remove rotatable class
      this.rotSett = !this.rotSett;
      if (this.rotSett) {
        e.srcElement.firstChild.classList.add("rotatable");
      } else {
        e.srcElement.firstChild.classList.remove("rotatable");
      }

      // Emit corresponding event
      this.$emit("toggle-settings");
    },
  },
};
</script>

<style scoped>
* {
  transition: all ease-in-out 200ms;
}

/* Format header */
.container-header {
  width: 100%;
  height: var(--hdr-size);
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(68, 68, 68, 0.3) 0px 1px 2px 0px,
    rgba(61, 61, 61, 0.15) 0px 1px 3px 1px;
}

.container-header img {
  width: 1.5rem;
  height: 1.5rem;
}

.container-header > div {
  cursor: pointer;
}

/* Format logo div*/
.logo {
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  font-size: 1.8125rem;
  height: 100%;
}

.logo img {
  padding: 0 0.25em;
  width: 2.75rem;
  height: 2.75rem;
}

/* Format icons to the right*/
.nav_icons ul {
  list-style-type: none;
  display: table;
  position: relative;
  padding: 0;
  margin: 0;
}

.nav_icons li {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: transparent;

  height: var(--hdr-size);
  width: var(--hdr-size);
}

/* Rotate settings icon on click */
.rotatable {
  transform: rotate(-70deg);
}

/* Color image white and background var(--accent-color) when hovered */
.nav_icons ul :hover,
.nav_icons ul :focus {
  background: var(--accent-color);
  color: var(--background-color);
}

.nav_icons li:hover img {
  filter: invert(1);
}

.nav_icons li img {
  pointer-events: none;
}
</style>
