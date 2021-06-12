<template>
  <div
    v-if="visible"
    id="tooltip"
    :style="{
      top: `${styleTop}px`,
      left: `${styleLeft}px`,
    }"
  >
    <div v-for="(item, index) in data" :key="index">
      <p>
        <b class="asd">{{ index }}: </b> {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["visible", "pos", "data"],
  computed: {
    styleTop() {
      return this.pos.top;
    },
    styleLeft() {
      //console.log(this.visible);
      return this.pos.left - 0;
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
#tooltip {
  animation: fadeIn 0.3s;
  position: absolute;
  // visibility: hidden;
  //top: var(--);
  background-color: rgba(0, 0, 0, 0.75);
  border: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
}
#tooltip p {
  color: white;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
