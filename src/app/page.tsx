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
            Join the waitlist
          </button>
        </header>
        <main className={styles.main}>
          <section className={styles.content}>
            <h1>Trade Smarter. Trade Faster. <br /> Trade with FarloFX.</h1>
            <p className={styles.sub_txt}>
              Whether you’re a seasoned pro or just starting out, <b>FarloFX</b>{" "}
              provides the tools, security, and transparency you need to master
              the forex markets.
            </p>
            <p className={styles.sub_txt}>
              Experience a smarter, more seamless way to trade, where{" "}
              <b>control</b>, <b>confidence</b>, and <b>clarity</b> define your
              trading journey.
            </p>
          </section>

          <div className={styles.ctas}>
            <button onClick={() => setWaitlist(true)} className={styles.btn}>
              Join the waitlist
            </button>
          </div>
          <p className={styles.rider}>
            Join a growing global community of traders who trust <b>FarloFX</b>{" "}
            for a faster, smarter trading experience.{" "}
            <b>Your financial future, powered by precision and performance.</b>
          </p>
        </main>
      </div>
    </>
  );
}
