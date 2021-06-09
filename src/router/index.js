import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import VisualisationPage from "../views/VisualisationPage.vue";
import InfoPage from "../views/InfoPage.vue";
import DownloadPage from "../views/DownloadPage.vue";
import store from "@/store";

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
    meta: {
      requiresDataset: true,
    },
  },
  {
    path: "/info",
    name: "infoPage",
    component: InfoPage,
  },
  {
    path: "/download",
    name: "downloadPage",
    component: DownloadPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Redirect to landing if no dataset was loaded yet
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresDataset)) {
    const thereIsNoDataset = store.getters["dataset/emails"].length === 0;

    if (thereIsNoDataset) {
      next({ name: "Landing" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
