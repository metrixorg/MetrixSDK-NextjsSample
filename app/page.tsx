import Image from 'next/image'
import styles from './page.module.css'
import MetrixSample from "../metrix/metrix-sample";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by reading&nbsp;
          <code className={styles.code}>README.md</code>
        </p>
        <div>
          <a
            href="https://metrix.ir/en/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles["logo-colored"]}
              src="/logo.webp"
              alt="Metrix Logo"
              width={100}
              height={24}
              priority
            />
            {' '}Docs
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo-white.png"
          alt="Metrix Logo White"
          width={180}
          height={37}
          priority
        />
      </div>

      <MetrixSample/>
    </main>
  )
}
