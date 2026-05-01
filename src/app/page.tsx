"use client";
import CoinsAnimation from "@/assets/animations/coins3.json";
import { NewLogo } from "@/assets/vectors/new-logo";
import WaitlistForm from "@/components/waitlist";
import { useState } from "react";
import styles from "./page.module.css";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const [waitlist, setWaitlist] = useState(false);

  return (
    <>
      <WaitlistForm isOpen={waitlist} onClose={() => setWaitlist(false)} />
      <div className={styles.page}>
      <>
        <div className={styles.overlay}></div>
        <Lottie
          className={styles.animation_wrapper}
          animationData={CoinsAnimation}
          loop={true}
        />
      </>

      <div className={styles.content_wrapper}>
        <header className={styles.header}>
          <NewLogo className={styles.header__logo} />
          <button onClick={() => setWaitlist(true)} className={styles.btn}>
            Get Early Access
          </button>
        </header>
        <main className={styles.main}>
          <section className={styles.content}>
            <h1>Trade FX. <br />Copy proven strategies.</h1>
            <h4>Invest in U.S. stocks.</h4>
            <p className={styles.sub_txt}>
              Move money globally, all from one account.
              <br />
              One KYC. One wallet. Built for the next billion users.
            </p>
          </section>

          <div className={styles.ctas}>
            <button onClick={() => setWaitlist(true)} className={styles.btn}>
              Get Early Access
            </button>
          </div>
          <p className={styles.rider}>
          Join 4,200+ early users across emerging markets.
          </p>
        </main>
        </div>


      </div>
    </>
  );
}
