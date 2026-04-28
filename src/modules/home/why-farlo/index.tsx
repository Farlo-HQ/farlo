import { Section } from "@/components";
import styles from "./styles.module.scss";
import {
  copy_social,
  islamic_acc,
  live_quotes,
  low_latency,
  one_to_1000,
  prop_trading,
  tight_spread,
  ultrafast_execution,
} from "@/assets/images";
import Image from "next/image";

const WhyFarlo = () => {
  const list = [
    {
      img: ultrafast_execution,
      img_size: 48,
      title: "Ultrafast execution",
      text: "Execute with speeds up to 30 milliseconds.",
    },
    {
      img: tight_spread,
      img_size: 48,
      title: "Tight spreads",
      text: "Starting at 0.6 pips, benefit from raw spreads.",
    },
    {
      img: one_to_1000,
      img_size: 48,
      title: "Up to 1:1000 in leverage",
      text: "Take on as much risk as you can handle.",
    },
    {
      img: islamic_acc,
      img_size: 48,
      title: "Islamic accounts",
      text: "Enjoy halal and interest-free trades.",
    },
    {
      img: live_quotes,
      img_size: 48,

      title: "Live quotes",
      text: "Move with the market, no matter the asset.",
    },
    {
      img: low_latency,
      img_size: 48,

      title: "Low latency",
      text: "Never experience lags on entry or exit.",
    },
    {
      img: copy_social,
      img_size: 40,

      title: "Copy trading & Social trading",
      text: "Get real-time insights, and strategies from top traders.",
    },
    {
      img: prop_trading,
      img_size: 40,
      title: "Prop trading",
      text: "Trade with funds from FarloFX, and maximize your earning.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why FarloFX</p>
        <h5 className={styles.ttl}>Unlock elite trading benefits</h5>
        <p className={styles.txt}>
          Enjoy an enhanced trading experience with exclusive features designed
          for performance.
        </p>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title, img, img_size }, index) => (
          <div key={`why-farlo-${index}`} className={styles.card}>
            <Image src={img} width={img_size} height={img_size} alt={title} />
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { WhyFarlo };
