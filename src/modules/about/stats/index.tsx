"use client";

import { Section } from "@/components";
import styles from "./styles.module.scss";
import { useState, useEffect, useRef } from "react";
import { useCountUp } from "@/hooks/useCountup";

const stats = [
  { value: 150, label: "total employees" },
  { value: 100, label: "markets tradeable" },
  { value: 350, label: "trading instruments" },
  { value: 30, label: "Countries supported" },
];

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <Section
      bgClassName={styles.bg}
      sectionClassName={styles.section}
      ref={sectionRef}
    >
      {stats.map(({ value, label }, i) => (
        <>
          <div className={styles.stat} key={`stat-${i}`}>
            <p className={styles.stat__ttl}>
              {useCountUp(value, hasAnimated)}+
            </p>
            <p className={styles.stat__txt}>{label}</p>
          </div>
          {i < stats.length - 1 ? <div className={styles.line}></div> : ""}
        </>
      ))}
    </Section>
  );
};

export { Stats };
