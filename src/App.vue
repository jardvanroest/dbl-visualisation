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
  --brdr-size: 2px;
  --border-color: rgba(221, 221, 221);
  --settings-border: var(--brdr-size) solid var(--border-color);
  --border-rad: 7px;
  --box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  --hdr-size: 3.125rem;
  --stt-width: 300px;
}

#app {
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;

  /* Mozilla Firefox scrollbar */
  scrollbar-color: var(--accent-color-light) #ebebeb;
  scrollbar-width: thin;
}

/* Scroll bar styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ebebeb;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--accent-color-light);
  border: 2px solid #ebebeb;
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
