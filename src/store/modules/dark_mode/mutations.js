export default {
  setColorTheme(state, theme) {
    state.theme = theme;
  },
  addCallback(state, callback) {
    state.callbacks.push(callback);
  },
};
