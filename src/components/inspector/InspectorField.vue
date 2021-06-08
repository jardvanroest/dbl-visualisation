<template>
  <div
    :class="{
      smallerText: tabbed,
      color: field.includes('Color'),
    }"
  >
    <span class="field" :class="{ tabbed: tabbed }">{{ field }}: </span>
    <span :class="{ false: info === false, true: info === true }" class="info"
      >{{ info }}
    </span>
    <span
      v-if="field.includes('Color')"
      class="color"
      :style="{ background: info }"
      @click="copy_to_clipboard"
    />
  </div>
</template>

<script>
export default {
  name: "InspectorField",
  props: ["field", "info", "tabbed"],
  methods: {
    copy_to_clipboard() {
      let tempInput = document.createElement("input");
      tempInput.value = this.info;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    },
  },
};
</script>

<style scoped>
.field {
  color: var(--accent-color);
  margin-left: 0.7em;
}

.info {
  font-size: 1rem;
}

.tabbed {
  margin-left: 1.4em;
}

.smallerText {
  font-size: 0.75rem;
}

.true {
  color: #3ae374;
}

.false {
  color: #ff3838;
}

.false {
  color: #ff3838;
}

.true {
  color: #3ae374;
}

/* Make color rectangle */
div.color {
  display: flex;
  flex-direction: row;
}
span.color {
  display: block;
  content: "";

  width: 0.85em;
  height: 0.85em;
  margin: auto 0;
  margin-left: 0.5em;

  border-radius: 25%;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>
