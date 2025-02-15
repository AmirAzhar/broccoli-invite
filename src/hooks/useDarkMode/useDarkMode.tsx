import { useState, useEffect } from "react";

const useDarkMode = (initialValue: boolean = false) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem("darkMode");
    return storedPreference ? JSON.parse(storedPreference) : initialValue;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
};

export default useDarkMode;
