import store from "@/store";
import { Brush } from "@/visualisations/brushes/index.js";

export class RectBrush extends Brush {
  _updateSelectedObjects(selectedObjects) {
    store.dispatch("brush_and_link/updateSelectedEdges", this._selectedObjects);
  }
}
