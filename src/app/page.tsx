"use client";
import { Logo } from "@/assets/vectors";
import styles from "./page.module.css";
import WaitlistForm from "@/components/waitlist";
import { useState } from "react";

export default function Home() {
  const [waitlist, setWaitlist] = useState(false);

  return (
    <>
      <WaitlistForm isOpen={waitlist} onClose={() => setWaitlist(false)} />
      <div className={styles.page}>
        <header className={styles.header}>
          <Logo className={styles.header__logo} />
          <button onClick={() => setWaitlist(true)} className={styles.btn}>
            Join waitlist
          </button>
        </header>
        <main className={styles.main}>
          <section className={styles.content}>
            <h1>Take control of your trading journey</h1>
            <p className={styles.sub_txt}>
              Whether you're a seasoned pro or just getting started, we provide
              the tools, security, and transparency to help you trade
              confidently.
            </p>
            <p className={styles.sub_txt}>
              FarloFX puts you in the driver’s seat of your financial future.
            </p>
          </section>

          <div className={styles.ctas}>
            <button onClick={() => setWaitlist(true)} className={styles.btn}>
              Join waitlist
            </button>
          </div>
          <p className={styles.rider}>
            Join a global network of traders who trust FarloFX for a smarter,
            more seamless way to trade.
          </p>
        </main>
      </div>
    </>
  );
}
