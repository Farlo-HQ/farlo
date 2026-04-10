"use client";
import { Logo } from "@/assets/vectors";
import styles from "./page.module.css";
import WaitlistForm from "@/components/waitlist";
import { useState } from "react";
import { NewLogo } from "@/assets/vectors/new-logo";

export default function Home() {
  const [waitlist, setWaitlist] = useState(false);

  return (
    <>
      <WaitlistForm isOpen={waitlist} onClose={() => setWaitlist(false)} />
      <div className={styles.page}>
        <header className={styles.header}>
          <NewLogo className={styles.header__logo} />
          <button onClick={() => setWaitlist(true)} className={styles.btn}>
            Get Early Access
          </button>
        </header>
        <main className={styles.main}>
          <section className={styles.content}>
            <h1>The trading and investing platform you have been waiting for.</h1>
            <p className={styles.sub_txt}>
              Fx Trading, Copy Trading, US equity investment and Global remittance in one account. One KYC, One wallet, One platform, Built for traders and investors across Africa and Emerging markets.
            </p>
          </section>

          <div className={styles.ctas}>
            <button onClick={() => setWaitlist(true)} className={styles.btn}>
              Get Early Access
            </button>
          </div>
          <p className={styles.rider}>
            Join 4,200+ traders already on the waitlist. Free to join. No card required.
          </p>
        </main>
      </div>
    </>
  );
}
