import { Section } from "@/components";
import styles from "./styles.module.scss";
import {
  live_alert,
  multi_device,
  one_tap,
  tight_spread,
} from "@/assets/images";
import Image from "next/image";

const WhySection = () => {
  const list = [
    {
      img: one_tap,
      title: "One-Tap Trading & Account Management",
      text: "Monitor your account, review trade history, and execute orders instantly.",
    },
    {
      img: tight_spread,
      title: "Comprehensive Order Types",
      text: "Access advanced order execution, including Buy Stop Limit and Sell Stop, for enhanced flexibility.",
    },
    {
      img: live_alert,
      title: "Live Market News & Alerts",
      text: "Stay informed with real-time financial news and price movement notifications.",
    },
    {
      img: multi_device,
      title: "Multi-Device Synchronization",
      text: "Seamlessly switch between desktop, tablet, and mobile without losing progress.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why MT5 Mobile</p>
        <h2 className={styles.ttl}>
          Advanced features for a seamless mobile{" "}
          <span>trading experience</span>
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
