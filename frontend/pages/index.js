import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


// export default function Home() {
//   return (
//     <main>
//       LANDING PAGE
//     </main>
//   );
// }

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>app name</div>
        <div className={styles.auth}>
          <a href="/login">log in</a>
          <a href="/signup">sign up</a>
        </div>
      </header>
      <main>
        <div className={styles.searchContainer}>
          <Image
            src="/assets/img4.png"
            alt="Event"
            width={400}
            height={400}
            className={styles.image}
          />
          <div className={styles.searchBox}>
            <h1>Where do you want to go?</h1>
            <div className={styles.searchInput}>
              <input
                type="text"
                id="search-bar"
                placeholder="Search"
                className={styles.input}
              />
              <button
                id="search-button"
                className={styles.button}
              >🔍</button>
            </div>
            <p id="search-result"></p>
          </div>
        </div>
      </main>
    </div>
  );
}