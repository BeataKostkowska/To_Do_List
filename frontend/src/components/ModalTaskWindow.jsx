import { useCallback, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./ModalTaskWindow.module.css";

function ModalTaskWindow({ children, onClickClose, header }) {
  const handleEsc = useCallback(
    (e) => {
      if (e.key === "Escape") onClickClose();
      else return;
    },
    [onClickClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflowY = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflowY = "auto";
    };
  }, [handleEsc]);

  return (
    <div className={styles.page_container} onClick={onClickClose}>
      <div
        className={styles.form_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.tooltip_container}>
          <button
            className={styles.close_button}
            onClick={onClickClose}
            data-tooltip-id="close"
            data-tooltip-delay-show={800}
          >
            X
          </button>
          <Tooltip
            id="close"
            place="bottom"
            content="Close"
            className={styles.tooltip}
            border="2px solid var(--coral-color)"
          />
        </div>
        <h2>{header}</h2>

        {children}
      </div>
    </div>
  );
}

export default ModalTaskWindow;
