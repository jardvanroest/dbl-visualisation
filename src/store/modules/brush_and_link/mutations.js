export default {
  updateSelectedNodes(state, newSelectedNodes) {
    state.selectedNodes = [...newSelectedNodes];
  },
  updateInteractionMode(state, newInteractionMode) {
    state.interactionMode = newInteractionMode;
  },
};
