<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
/* Normalize css */
@import "~normalize.css";

/* Import fonts from fonts.google.com */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@300&display=swap");

/* Global variables to be used troughout the whole site */
:root {
  --accent-color: #38ada9;
  --accent-color-light: #38ada993;
  --accent-color-2: #067572;
  --link-color: #0000ff;
  --error-color: #ff0000;
  --background-color: white;
  --background-color-2: #eaf3f3;
  --border-color: rgba(221, 221, 221);
  --settings-border: 2px solid var(--border-color);
}

#app {
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
}

/* Scroll bar styling */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.164);
  background-color: #00000008;
}
::-webkit-scrollbar {
  width: 11px;
  background-color: #00000008;
}
::-webkit-scrollbar-thumb {
  background-color: var(--background-color);
  border: 4px solid var(--accent-color-light);
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
</style>
