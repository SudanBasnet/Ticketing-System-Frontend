import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const THEME_KEY = "clearqueue-theme";

const initialTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "light";
};

const ThemeToggle = ({ darkSurface = false }) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const isDark = theme === "night";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "night")}
      className={`btn btn-circle btn-sm border ${darkSurface && isDark ? "border-white/15 bg-white/5 text-white hover:bg-white/10" : "border-base-300 bg-base-100 text-base-content"}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
