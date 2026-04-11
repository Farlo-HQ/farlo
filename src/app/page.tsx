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
            <h1>Your gateway to global trading, investing, and payments.</h1>
            <h4> Built to unlock global markets for the next billion users.</h4>
            <p className={styles.sub_txt}>
              Trade FX, copy top startegies, invest in U.S. stocks, and move money globally — all from a single account.
              <br />
              One KYC. One Wallet. Built for users across emerging markets.
            </p>
          </section>

          <div className={styles.ctas}>
            <button onClick={() => setWaitlist(true)} className={styles.btn}>
              Get Early Access
            </button>
          </div>
          <p className={styles.rider}>
            Join 4,200+ early users on the waitlist. Free to join.
          </p>
        </main>
      </div>
    </>
  );
}
