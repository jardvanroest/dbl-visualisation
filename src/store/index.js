import { createStore } from "vuex";
import _dataset from "./modules/dataset";

export default createStore({
  state: {
    dataset: undefined,
    tooltip: "laina 3",
  },
  modules: {
    _dataset,
  },
});
