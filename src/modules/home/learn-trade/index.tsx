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
    title: "Monthly live webinars",
    text: "Live sessions with market analysts. Recorded and available after. Calendar updated monthly.",
    icon: <LiveWebinars />,
    backgroundColor: "#cb1a36",
  },
  {
    title: "Research and analysis",
    text: "Weekly market outlook. Economic calendar with impact ratings. Technical levels updated daily.",
    icon: <TechResearch />,
    backgroundColor: "#9d142a",
  },
  {
    title: "Courses and guides",
    text: "Three learning tracks: Starting Out, Building Skills, and Advanced. Know where to begin and where to go next.",
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
          Learn. Then trade <span>with confidence.</span>
        </p>
        <p className={styles.content__txt}>
          Every piece of content in this section was written for traders who are serious about getting better. No fluff. No generic advice.
        </p>
        <Link href={""}>
          Learn more <ArrowRight />
        </Link>
      </div>
    </Section>
  );
};

export { LearnTrade };
