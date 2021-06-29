import store from "@/store";
import { Brush } from "@/visualisations/brushes/index.js";

export class NodeBrush extends Brush {
  _updateSelectedObjects(selectedObjects) {
    store.dispatch("brush_and_link/updateSelectedNodes", this._selectedObjects);
  }
}
