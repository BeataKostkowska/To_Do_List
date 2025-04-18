import { useEffect } from "react";
import styles from "./LightDarkModeButton.module.css";

import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useThemeStore } from "../store";

function LightDarkModeButton() {
  const lightMode = useThemeStore((state) => state.lightMode);
  const changeMode = useThemeStore((state) => state.changeMode);

  useEffect(() => {
    if (lightMode) document.body.setAttribute("data-theme", "light");
    if (!lightMode) document.body.setAttribute("data-theme", "dark");
  }, [lightMode]);

  useEffect(() => {
    const browserThemeSettings = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    if (!localStorage.getItem("theme-storage")) {
      localStorage.setItem(
        "theme-storage",
        `{"state":{"lightMode":${browserThemeSettings.matches}},"version":0}`
      );
    }

    const handleBrowserSettingsChange = () => {
      const modeInStorage = localStorage.getItem("theme-storage");
      const currentMode = JSON.parse(modeInStorage).state.lightMode;

      if (browserThemeSettings.matches !== currentMode) changeMode();
    };

    browserThemeSettings.addEventListener(
      "change",
      handleBrowserSettingsChange
    );

    return () => {
      browserThemeSettings.removeEventListener(
        "change",
        handleBrowserSettingsChange
      );
    };
  }, [changeMode]);

  return (
    <button className={styles.frame} onClick={changeMode}>
      <MdOutlineLightMode className={styles.icon} />
      <div
        className={`${styles.toggle} ${lightMode ? styles.light : styles.dark}`}
      ></div>
      <MdDarkMode className={styles.icon} />
    </button>
  );
}

export default LightDarkModeButton;
