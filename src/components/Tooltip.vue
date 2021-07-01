<template>
  <div
    ref="tp"
    v-if="visible"
    id="tooltip"
    :style="{
      top: `${styleTop}px`,
      left: `${styleLeft}px`,
    }"
  >
    <div v-for="(item, index) in data" :key="index">
      <p>
        <b class="index">{{ index }}: </b> {{ item }}
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
      return this.pos.left;
    },
  },
};
</script>

<style scoped lang="scss">
#tooltip {
  animation: fadeIn 0.3s;
  position: absolute;
  font-size: 0.75rem;
  background-color: rgba(0, 0, 0, 0.75);
  border: transparent;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  max-width: 220px;
}
#tooltip p {
  color: white;
  margin: 2px;
}
.index {
  color: #4ee6e0;
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
