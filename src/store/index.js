import { createStore } from "vuex";
import _dataset from "./modules/dataset";

export default createStore({
  state: {
    dataset: undefined,
  },
  modules: {
    _dataset,
  },
});
