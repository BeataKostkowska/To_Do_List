import styles from "./Button.module.css";

function Button({ onClick, children }) {
  return (
    <button className={styles.btn} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default Button;
