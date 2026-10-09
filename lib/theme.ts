// Local-time window for automatic dark mode: 7pm to 7am
export const NIGHT_START_HOUR = 19;
export const DAY_START_HOUR = 7;
export const OVERRIDE_KEY = 'themeOverride';

// Runs in <head> before first paint so night-time visitors never see a light flash.
// Mirrors resolveDarkMode() in components/ThemeProvider.tsx.
export const themeInitScript = `(function () {
  try {
    var dark = null;
    var saved = JSON.parse(localStorage.getItem('${OVERRIDE_KEY}') || 'null');
    if (saved && saved.expires > Date.now()) dark = saved.darkMode;
    if (dark === null) {
      var h = new Date().getHours();
      dark = h >= ${NIGHT_START_HOUR} || h < ${DAY_START_HOUR};
    }
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;
