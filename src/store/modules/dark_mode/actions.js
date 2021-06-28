export default {
  switchColorTheme(context) {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme !== "dark") {
      context.dispatch("setColorTheme", "dark");
    } else {
      context.dispatch("setColorTheme", "light");
    }
  },
  setColorTheme(context, theme) {
    document.documentElement.setAttribute("data-theme", theme);
    context.commit("setColorTheme", theme);
    localStorage.setItem("theme", theme);
  },
};
