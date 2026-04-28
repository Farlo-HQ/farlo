import { Section } from "@/components";
import styles from "./styles.module.scss";
import {
  advanced_trading,
  economic_calendar,
  market_analysis,
  one_to_1000,
  tight_spread,
} from "@/assets/images";
import Image from "next/image";

const WhySection = () => {
  const list = [
    {
      img: market_analysis,
      title: "Comprehensive Market Analysis",
      text: "Access 38 built-in indicators, 22 analytical tools, and 46 graphical objects for precision trading.",
    },
    {
      img: tight_spread,
      title: "Integrated Copy Trading & Signals",
      text: "Follow top-performing traders and automatically mirror their strategies in real time.",
    },
    {
      img: advanced_trading,
      title: "Advanced Algorithmic Trading",
      text: "Develop custom indicators and trading robots with the built-in MetaEditor tool.",
    },
    {
      img: one_to_1000,
      title: "Hedging and Netting Support",
      text: "Open multiple positions on the same asset, including hedged positions, for greater risk management.",
    },
    {
      img: economic_calendar,
      title: "Economic Calendar & Fundamental Analysis",
      text: "Stay informed with real-time financial news updates directly within the platform.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why MT5 Desktop</p>
        <h2 className={styles.ttl}>
          A <span>multi-asset</span> platform built for performance
        </h2>
        <p className={styles.txt}>
          Full-featured trading, real-time analytics, and instant
          execution—wherever you are.
        </p>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title, img }, index) => (
          <div key={`why-farlo-${index}`} className={styles.card}>
            <Image src={img} width={48} height={48} alt={title} />
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { WhySection };
