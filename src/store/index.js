import { createStore } from "vuex";
import dataset from "./modules/dataset";
import brush_and_link from "./modules/brush_and_link";
import dark_mode from "./modules/dark_mode";

export default createStore({
  modules: {
    dataset,
    brush_and_link,
    dark_mode,
  },
});
