import styles from "./WelcomePage.module.css";

function WelcomePage() {
  return (
    <>
      <h1 className={styles.header_welcome}>Let's get things done!</h1>
      <div className={styles.buttons_container}>
        <button className={styles.btn}>Explore</button>
        <button className={styles.btn}>Sign in</button>
        <button className={styles.btn}>Sign up</button>
      </div>
    </>
  );
}

export default WelcomePage;
