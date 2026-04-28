"use client"

import { useLayoutEffect, useRef } from "react";
import { Section } from "@/components";
import styles from "./styles.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    title: "Fragmented by design.",
    body: "To trade FX, copy a strategy, and invest in US stocks you need three separate platforms. Three KYCs. Three wallets. None of them talk to each other.",
  },
  {
    title: "Your country is a barrier.",
    body: "Robinhood rejects Nigerian accounts. Most MT4 brokers require wire transfers. Spreads are inflated to cover the friction they charge you for.",
  },
  {
    title: "Your money moves too slowly.",
    body: "A winning FX trade takes 3 to 5 days to reach your equity account. By the time it arrives, the opportunity is gone.",
  },
];

const Problem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".problem-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(bridgeRef.current, {
        scrollTrigger: {
          trigger: bridgeRef.current,
          start: "top 90%",
        },
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".problem-card-border", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div ref={headingRef} className={styles.header}>
          <p className={styles.label}>WHY MOST PLATFORMS FAIL TRADERS IN EMERGING MARKETS</p>
          <h2 className={styles.ttl}>Built for New York.<br />Not for Nairobi.</h2>
        </div>

        <div ref={cardsRef} className={styles.cards}>
          {problems.map(({ title, body }, i) => (
            <div key={i} className={`problem-card ${styles.card}`}>
              <div className={`problem-card-border ${styles.card__border}`} />
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__body}>{body}</p>
            </div>
          ))}
        </div>

        <p ref={bridgeRef} className={styles.bridge}>
          FARLO was built to remove all three walls.
        </p>
      </Section>
    </div>
  );
};

export { Problem };
