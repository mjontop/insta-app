import Head from "next/head";
import styles from "../styles/Home.module.css";
import Home from "../Components/Home/Home";
export default function Homepage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>InstaApp</title>
      </Head>
      <main className="main">
        <Home />
      </main>
    </div>
  );
}
