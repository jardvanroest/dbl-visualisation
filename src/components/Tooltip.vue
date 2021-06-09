<template>
  <div
    id="tooltip"
    ref="cont"
    :style="{
      height: 'auto',
      width: 'auto',
      top: `${this.tp}px`,
      left: `${this.lf}px`,
    }"
    class="bottom positioning"
    v-if="visible"
  >
    <div class="tooltip-label">
      <ul>
        <li v-bind:key="index" v-for="(value, prop, index) in data">
          {{ prop }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// TODO: Add more functionality
export default {
  name: "Tooltip",
  props: ["data", "posX", "posY", "visible"],
  data() {
    return {
      posY_offset: -80,
      posX_offset: 50,
      width_dataEl: 0,
      height_dataEl: 20,
    };
  },
  computed: {
    tp() {
      let inside = this.getPixelsOutsideWindowHeight();
      if (inside > 0) {
        return this.posY + this.posY_offset - inside - 50;
      } else return this.posY + this.posY_offset;
    },
    lf() {
      let inside = this.getPixelsOutsideWindowWidth();
      if (inside > 0) {
        return this.posX + this.posX_offset + inside - 300;
      } else return this.posX + this.posX_offset;
    },
    getDataLength() {
      return Object.keys(this.data).length;
    },
  },
  methods: {
    getPixelsOutsideWindowWidth() {
      return this.posX + this.posX_offset + 300 - window.innerWidth;
    },
    getPixelsOutsideWindowHeight() {
      return (
        this.posY +
        this.posY_offset +
        this.height_dataEl * this.getDataLength -
        window.innerHeight
      );
    },
  },
};
</script>

<style scopped>
ul {
  list-style-type: none;
}
#tooltip {
  animation: fadeIn 0.3s;
  position: absolute;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 100;
  letter-spacing: normal;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-shadow: none;
  text-transform: none;
  white-space: nowrap;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  display: inline-block;
}
#tooltip.bottom {
  margin-top: 5px;
}
#tooltip.bottom .tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
#tooltip .tooltip-arrow {
  position: absolute;
  width: 10;
  height: 10;
  border-color: transparent;
  border-right-color: transparent;
  border-style: solid;
}

#tooltip .tooltip-label {
  padding: 3px 3px;
  padding-right: 35px;
  color: #fff;
  text-align: left;
  background-color: #000;
  border-radius: 4px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
