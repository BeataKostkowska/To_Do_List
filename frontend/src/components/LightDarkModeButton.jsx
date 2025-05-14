import { useEffect, useState } from "react";
import styles from "./LightDarkModeButton.module.css";

import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useThemeStore } from "../store";

function LightDarkModeButton() {
  const lightMode = useThemeStore((state) => state.lightMode);
  const changeMode = useThemeStore((state) => state.changeMode);

  // Animation only on user click
  const [userClicked, setUserClicked] = useState(false);
  const handleClick = () => {
    setUserClicked(true);
    changeMode();
  };

  // Setting correct set of colours for dark/light mode
  useEffect(() => {
    if (lightMode) document.body.setAttribute("data-theme", "light");
    if (!lightMode) document.body.setAttribute("data-theme", "dark");
  }, [lightMode]);

  // Responding to change in browser settings
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
    <button className={styles.frame} onClick={handleClick}>
      <MdOutlineLightMode className={styles.icon} />
      <div
        className={`${styles.toggle} ${
          lightMode ? styles.light : styles.dark
        } ${userClicked && lightMode ? styles.light_animation : ""} 
        ${userClicked && !lightMode ? styles.dark_animation : ""}`}
      ></div>
      <MdDarkMode className={styles.icon} />
    </button>
  );
}

export default LightDarkModeButton;
