<template>
  <vue-slider
    v-model="sliderValues"
    :tooltip-formatter="tooltipFormatter"
    :min="0"
    :max="999999999"
  />
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      sliderValues: [0, 999999999],
      tooltipFormatter: function (milliseconds) {
        const date = new Date(milliseconds);

        const formattedDate = new Intl.DateTimeFormat("en", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(date);

        return formattedDate;
      },
    };
  },
};
</script>
