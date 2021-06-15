export default {
  updateSelectedNodes(context, data) {
    context.commit("updateSelectedNodes", data);
  },
  updateInteractionMode(context, data) {
    context.commit("updateInteractionMode", data);
  },
};
