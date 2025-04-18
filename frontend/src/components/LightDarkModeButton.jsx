import { useEffect } from "react";
import styles from "./LightDarkModeButton.module.css";

import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useThemeStore } from "../store";

function LightDarkModeButton() {
  const lightMode = useThemeStore((state) => state.lightMode);
  const changeMode = useThemeStore((state) => state.changeMode);

  useEffect(() => {
    if (lightMode) document.body.setAttribute("data-theme", "light");
    if (!lightMode) document.body.setAttribute("data-theme", "dark");
  }, [lightMode]);

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
