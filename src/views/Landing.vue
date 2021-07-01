<template>
  <div class="landing">
    <Spinner :show="showSpinner" offset="0.5rem" style="z-index: 10" />
    <div class="home">
      <img
        v-if="theme === 'dark'"
        src="@/assets/icons/logo-dark.svg"
        alt="logo"
      />
      <img v-else src="@/assets/icons/logo.svg" alt="logo" />
      <h1 class="title">MailVis</h1>
      <p class="introduction">A tool to analyze e-mail traffic.</p>
      <ImportDataSetBtn @newFile="spinnerShow" />
      <ViewExampleDataSetBtn @click="spinnerShow" />
    </div>
    <div @click="redirectToInfo" class="info">
      <img src="@/assets/icons/info.svg" alt="information" />
    </div>
  </div>
</template>

<script>
import ImportDataSetBtn from "@/components/buttons/ImportDataSetBtn.vue";
import ViewExampleDataSetBtn from "@/components/buttons/ViewExampleDataSetBtn.vue";
import { mapGetters } from "vuex";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Landing",
  components: {
    ImportDataSetBtn,
    ViewExampleDataSetBtn,
    Spinner,
  },
  data() {
    return {
      showSpinner: false,
    };
  },
  methods: {
    redirectToInfo() {
      this.$router.push({ path: "/info" });
    },
    spinnerShow() {
      this.showSpinner = true;
    },
  },
  computed: {
    ...mapGetters("dark_mode", ["theme"]),
  },
  mounted() {
    console.log(this.theme);
  },
};
</script>

<style scoped lang="scss">
.landing {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/icons/tileable-hex.png");
  background-repeat: repeat;
  background-position: 0 0;
  background-size: auto 69%;
  background-color: var(--border-color);
  background-blend-mode: screen;

  animation: animatedBackground 50s linear infinite;
}

[data-theme="dark"] {
  .landing {
    background-image: url("../assets/icons/tileable-hex-dark.png");
    background-blend-mode: normal;
  }
}

.info img {
  width: 5%;
  height: 5%;
  position: fixed;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}

.home {
  width: fit-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.title {
  font-family: "Roboto", sans-serif;
  font-size: 4rem;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
}

img {
  width: 15rem;
}

.introduction {
  font-size: 1.5rem;
}

@keyframes animatedBackground {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100px 75px;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
