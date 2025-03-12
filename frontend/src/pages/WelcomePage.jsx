import styles from "./WelcomePage.module.css";

function WelcomePage() {
  return (
    <>
      <h1 className={styles.header_welcome}>Let's get things done!</h1>
      <div className={styles.buttons_container}>
        <button>Explore</button>
        <button>Sign in</button>
        <button>Sign up</button>
      </div>
    </>
  );
}

export default WelcomePage;
