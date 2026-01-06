import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>안녕하세요, 미니멀 개발자입니다.</h1>
        <p>복잡함을 덜어내고 본질에 집중하는 웹 환경을 만듭니다.</p>
      </section>
    </main>
  );
}