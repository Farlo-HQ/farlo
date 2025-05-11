import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { trading_crypto_coins } from "@/assets/images";

const WhyFarlo = () => {
  const list = [
    {
      title: "Ultra-Competitive Spreads & Leverage",
      text: "Tight spreads and leverage up to 1:500 to maximize your trading potential.",
    },
    {
      title: "Instant & Secure Transactions",
      text: "Fund your account with lightning-fast deposits and withdrawals using multiple payment options.",
    },
    {
      title: "Globally Regulated Broker",
      text: "Trade confidently with a licensed and regulated broker recognized by major financial authorities.",
    },
    {
      title: "Intuitive & Mobile-Friendly Platform",
      text: "Start trading in just a few clicks on desktop or mobile via our FarloFX app.",
    },
    {
      title: "Real-Time Transparent Pricing",
      text: "Trade with live market prices 24/7, ensuring zero manipulation and full transparency.",
    },
  ];
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.header}>
        <p className={styles.header__tag}>How it works</p>
        <h2 className={styles.header__ttl}>
          A Smarter Way To <span>Trade</span> Digital Assets
        </h2>
      </div>
      <div className={styles.content}>
        <Image src={trading_crypto_coins} alt="Crypto coins" width={520} height={600} />
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
