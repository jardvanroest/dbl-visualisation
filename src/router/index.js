import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import VisualisationPage from "../views/VisualisationPage.vue";
import InfoPage from "../views/InfoPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/visualisation",
    name: "visualisationPage",
    component: VisualisationPage,
  },
  {
    path: "/info",
    name: "infoPage",
    component: InfoPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
