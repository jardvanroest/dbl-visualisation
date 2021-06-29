export default {
  updateSelectedNodes(context, data) {
    context.commit("updateSelectedNodes", data);
  },
  updateSelectedEdges(context, data) {
    context.commit("updateSelectedEdges", data);
  },
  updateInteractionMode(context, data) {
    context.commit("updateInteractionMode", data);
  },
  updateInspectedElement(context, data) {
    context.commit("updateInspectedElement", data);
  },
};
