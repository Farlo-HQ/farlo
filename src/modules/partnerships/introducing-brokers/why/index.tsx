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
      title: "Licensed in 100+ Countries",
      text: "FarloFX is licensed by FSA, CySEC, FCA, FSCA, FSC, FCS, CMA",
    },
    {
      img: tight_spread,
      title: "Best spreads in the market",
      text: "Enjoy the lowest spreads of up to 0.1 with instant execution, and leverage of up to 1:1000",
    },
    {
      img: advanced_trading,
      title: "Instant deposits and withdrawals",
      text: "Choose from 15+ global and local payment partners to process your funds",
    },
    {
      img: one_to_1000,
      title: "Up to 0% in commission",
      text: "Our variety of payment systems provides you with up to 0% in commissions",
    },
    {
      img: economic_calendar,
      title: "24/7 client support in 15 languages",
      text: "No matter what you speak, or when you need us. We’re always ready for you.",
    },
    {
      img: economic_calendar,
      title: "Help Center for everyone",
      text: "No matter your standing; experienced trader or newbie. Our help center caters to all your needs.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <h2 className={styles.ttl}>Why our clients choose us </h2>
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
