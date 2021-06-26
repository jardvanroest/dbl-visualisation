import { createStore } from "vuex";
import dataset from "./modules/dataset";
import brush_and_link from "./modules/brush_and_link";
import coloring from "./modules/coloring";

export default createStore({
  modules: {
    dataset,
    brush_and_link,
    coloring,
  },
});
