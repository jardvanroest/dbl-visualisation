export default {
  updateSelectedNodes(state, newSelectedNodes) {
    state.selectedNodes = [...newSelectedNodes];
  },
  updateSelectedEdges(state, newSelectedEdges) {
    state.selectedEdges = [...newSelectedEdges];
  },
  updateInteractionMode(state, newInteractionMode) {
    state.interactionMode = newInteractionMode;
  },
  updateInspectedElement(state, newInspectedElement) {
    state.inspectedElement = newInspectedElement;
  },
};
