import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { trading_forex_coins } from "@/assets/images";

const WhyFarlo = () => {
  const list = [
    {
      title: "Stop Out Protection",
      text: "Shield your trades from extreme volatility with automated risk management.",
    },
    {
      title: "Instant Payouts",
      text: "Access your earnings with swift withdrawals and instant transaction processing.",
    },
    {
      title: "Next-Gen Trading Platforms",
      text: "Trade on MT5, fully equipped with advanced charting, indicators, and automation.",
    },
    {
      title: "Capitalize on Currency Movements",
      text: "Trade major, minor, and exotic pairs with ultra-low spreads.",
    },
    {
      title: "Precision Execution",
      text: "Execute trades in milliseconds with institutional-grade technology.",
    },
    {
      title: "Low and Stable Spreads",
      text: "Enjoy consistent pricing, even during high-impact news events.",
    },
  ];
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.header}>
        <p className={styles.header__tag}>Why FarloFX</p>
        <h2 className={styles.header__ttl}>
          Your <span>forex advantage</span> starts here
        </h2>
      </div>
      <div className={styles.content}>
        <Image src={trading_forex_coins} alt="Coins" width={520} height={600} />
        <div className={styles.content__list}>
          {list.map(({text, title}) => (
            <div key={title.replaceAll(" ", "_")} className={styles.item}>
              <p className={styles.item__ttl}>{title}</p>
              <p className={styles.item__txt}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { WhyFarlo };
