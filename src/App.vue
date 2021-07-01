<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("dark_mode", ["setColorTheme"]),
  },
  mounted() {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === undefined) {
      this.setColorTheme("light");
    } else {
      this.setColorTheme(storedTheme);
    }
  },
};
</script>

<style lang="scss">
/* Normalize css */
@import "~normalize.css";

/* Import fonts from fonts.google.com */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@300&display=swap");

/* Global variables to be used troughout the whole site */
:root {
  --text-color: #000;
  --accent-color: #38ada9;
  --accent-color-light: #38ada993;
  --accent-color-2: #067572;
  --link-color: #0000ff;
  --error-color: #ff0000;
  --background-color: white;
  --background-color-2: #eaf3f3;
  --brdr-size: 2px;
  --border-color: rgba(221, 221, 221);
  --settings-border: var(--brdr-size) solid var(--border-color);
  --border-rad: 7px;
  --box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  --hdr-size: 3.125rem;
  --stt-width: 300px;
}

[data-theme="dark"] {
  --text-color: #999999;
  --accent-color: #328380;
  --accent-color-light: #2d8a87;
  --accent-color-2: #2d8a87;
  --link-color: #0000ff;
  --error-color: #ff0000;
  --background-color: #1d1d1d;
  --background-color-2: #000000;
  --border-color: #292929;
  --settings-border: var(--brdr-size) solid var(--border-color);
  --box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

#app {
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
  color: var(--text-color);

  /* Mozilla Firefox scrollbar */
  scrollbar-color: var(--accent-color-light) var(--background-color-2);
  scrollbar-width: thin;
}

select {
  color: var(--text-color);
}

/* Scroll bar styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: var(--background-color-2);
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--accent-color-light);
  border: 2px solid var(--background-color-2);
}

/* Prevent user-selection of elements listed below by giving them class of no_highlight*/
header,
.no_highlight {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

html {
  scroll-behavior: smooth;
}
</style>
