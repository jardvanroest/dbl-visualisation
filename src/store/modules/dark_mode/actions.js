export default {
  switchColorTheme(context) {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme !== "dark") {
      context.dispatch("setColorTheme", "dark");
    } else {
      context.dispatch("setColorTheme", "light");
    }

    context.dispatch("notifyObservers");
  },
  setColorTheme(context, theme) {
    document.documentElement.setAttribute("data-theme", theme);
    context.commit("setColorTheme", theme);
    localStorage.setItem("theme", theme);
  },
  onChange(context, callback) {
    context.commit("addCallback", callback);
  },
  notifyObservers(context) {
    const theme = context.getters.theme;
    const callbacks = context.getters.callbacks;
    callbacks.forEach((callback) => callback(theme));
  },
};
