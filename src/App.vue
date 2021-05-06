<template>
  <router-view />
</template>

<style lang="scss">
/* Normalize css */
@import "~normalize.css";

/* Import fonts from fonts.google.com */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@300&display=swap");

/* Global variables to be used troughout the whole site */
:root {
  --accent-color: #bbc3f1;
}

#app {
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
}

/* Prevent user-selection of elements listed below */
.header {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
