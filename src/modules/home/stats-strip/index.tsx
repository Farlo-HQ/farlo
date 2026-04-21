"use client"

import { useLayoutEffect, useRef } from "react";
import { Section } from "@/components";
import styles from "./styles.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "350+",    label: "Tradeable Instruments" },
  { value: "0.6 pip", label: "Spreads From" },
  { value: "30ms",    label: "Order Execution" },
  { value: "1:1000",  label: "Maximum Leverage" },
  { value: "24/5",    label: "Customer Support" },
];

const StatsStrip = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats-item", {
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
        y: 24, opacity: 0, duration: 0.55,
        stagger: 0.1, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        {stats.map(({ value, label }, i) => (
          <div key={i} className={`stats-item ${styles.stat}`}>
            <p className={styles.stat__value}>{value}</p>
            <p className={styles.stat__label}>{label}</p>
          </div>
        ))}
      </Section>
    </div>
  );
};

export { StatsStrip };
