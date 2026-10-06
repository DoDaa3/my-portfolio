import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Local-time window for automatic dark mode: 7pm to 7am
const NIGHT_START_HOUR = 19;
const DAY_START_HOUR = 7;
const OVERRIDE_KEY = 'themeOverride';

const isNightTime = (date = new Date()) => {
  const hour = date.getHours();
  return hour >= NIGHT_START_HOUR || hour < DAY_START_HOUR;
};

// Timestamp of the next day/night switch, used to expire manual overrides
const nextSwitchTime = (date = new Date()) => {
  const next = new Date(date);
  next.setMinutes(0, 0, 0);
  const hour = date.getHours();
  if (hour < DAY_START_HOUR) {
    next.setHours(DAY_START_HOUR);
  } else if (hour < NIGHT_START_HOUR) {
    next.setHours(NIGHT_START_HOUR);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(DAY_START_HOUR);
  }
  return next.getTime();
};

const readOverride = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(OVERRIDE_KEY));
    if (saved && saved.expires > Date.now()) return saved.darkMode;
    localStorage.removeItem(OVERRIDE_KEY);
  } catch {
    // Storage unavailable or corrupt; fall back to automatic mode
  }
  return null;
};

const resolveDarkMode = () => {
  const override = readOverride();
  return override !== null ? override : isNightTime();
};

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(resolveDarkMode);

  useEffect(() => {
    // Clean up the old permanent setting from before auto mode existed
    try {
      localStorage.removeItem('darkMode');
    } catch {
      // ignore
    }

    // Re-check every minute and when the tab regains focus
    const update = () => setDarkMode(resolveDarkMode());
    const interval = setInterval(update, 60 * 1000);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Manual toggle overrides automatic mode until the next day/night switch
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(
          OVERRIDE_KEY,
          JSON.stringify({ darkMode: next, expires: nextSwitchTime() })
        );
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
