"use client"

import { useEffect, useState } from "react";
import { Section } from "@/components";
import styles from "./styles.module.scss";
import { LiveWebinars } from "@/assets/vectors/live-webinars";
import { BooksGuides } from "@/assets/vectors/books-guides";
import { TechResearch } from "@/assets/vectors/tech-research";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Link from "next/link";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const baseData = [
  {
    title: "Live Webinars",
    text: "Stay updated with expert insights and real-time market analysis.",
    icon: <LiveWebinars />,
    backgroundColor: "#cb1a36",
  },
  {
    title: "Technical and Fundamental Research",
    text: "Make informed decisions with top-tier data.",
    icon: <TechResearch />,
    backgroundColor: "#9d142a",
  },
  {
    title: "E-books and Guides",
    text: "Master market fundamentals and advanced trading techniques.",
    icon: <BooksGuides />,
    backgroundColor: "#631420",
  },
];

const shuffleOrder = [
  [0, 1, 2],
  [2, 0, 1],
  [1, 2, 0],
];

const LearnTrade = () => {
  const { isMobile } = useDeviceSize(800);
  const [orderIndex, setOrderIndex] = useState(0);
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setOrderIndex((prev) => (prev + 1) % shuffleOrder.length);
    }, 5000); // Shuffle every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const data = isMobile
    ? baseData
    : shuffleOrder[orderIndex].map((i) => baseData[i]);

  useEffect(() => {
    if (isMobile) return;
    setAnimateIndex(2); // Always the last card in the displayed data

    const timeout = setTimeout(() => {
      setAnimateIndex(null); // Remove animation class after 1s
    }, 1000);

    return () => clearTimeout(timeout);
  }, [orderIndex]);

  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.cards}>
        {data.map(({ icon, text, title, backgroundColor }, index) => (
          <div
            style={{ backgroundColor }}
            className={`${styles.card} ${animateIndex === index ? styles.scaleUp : ""
              }`}
            key={`learn-trade-${index}`}
          >
            {icon}
            <div>
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <p className={styles.content__ttl}>
          Learn, Trade, Succeed <span>with FarloFX</span>
        </p>
        <p className={styles.content__txt}>
          Our extensive suite of learning materials provides insights from
          industry professionals through:
        </p>
        <Link href={""}>
          Learn more <ArrowRight />
        </Link>
      </div>
    </Section>
  );
};

export { LearnTrade };
