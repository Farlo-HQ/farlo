import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { trading_indices } from "@/assets/images";

const WhyFarlo = () => {
  const list = [
    {
      title: "Global Market Access",
      text: "Trade major indices that reflect entire national stock markets instead of individual stocks.",
    },
    {
      title: "Go Long or Short",
      text: "Profit from both bullish and bearish market trends with equal flexibility.",
    },
    {
      title: "Leverage Up to 1:400",
      text: "Amplify your exposure while maintaining precise risk control.",
    },
    {
      title: "Tight Spreads & Low Commissions",
      text: "Maximize profits with some of the lowest trading costs in the industry.",
    },
    {
      title: "Expert Advisors & Trading Signals",
      text: "Automate your trades and enhance your strategy with market insights.",
    },
  ];
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.header}>
        <p className={styles.header__tag}>Why FarloFX</p>
        <h2 className={styles.header__ttl}>
          Benefits of trading indices on <span>FarloFX</span>
        </h2>
      </div>
      <div className={styles.content}>
        <Image src={trading_indices} alt="Indices" width={520} height={600} />
        <div className={styles.content__list}>
          {list.map(({ text, title }) => (
            <div key={title.replaceAll(" ", "_")} className={styles.item}>
              <p className={styles.item__ttl}>{title}</p>
              <p className={styles.item__txt}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { WhyFarlo };
