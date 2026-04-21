"use client"

import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { cfdIcon, commoditiesIcon, cryptoIcon, forexIcon, indicesIcon, stocksIcon } from "@/assets/images/3d";

const Gateway = () => {
  const gateways = [
    { title: "Forex", text: "EUR/USD, GBP/USD, USD/NGN", icon: forexIcon },
    { title: "Indices", text: "US30, NAS100, FTSE100", icon: indicesIcon },
    { title: "US Stocks", text: "AAPL, NVDA, TSLA", icon: stocksIcon },
    { title: "Commodities", text: "GOLD, SILVER, OIL", icon: commoditiesIcon },
    { title: "Crypto CFDs", text: "BTC/USD, ETH/USD, SOL/USD", icon: cryptoIcon },
    { title: "Copy Trading", text: "Follow verified strategies", icon: cfdIcon },
  ];

  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      {/* Left */}
      <div className={styles.left}>
        <p className={styles.label}>350+ INSTRUMENTS</p>
        <h2 className={styles.ttl}>Every major market. One account.</h2>
        {/* <p className={styles.txt}>
          Forex, indices, US stocks, commodities, crypto CFDs, and copy
          trading — all in one place, with one KYC.
        </p> */}
      </div>

      {/* Right — 2×3 card grid */}
      <div className={styles.cards}>
        {gateways.map(({ icon, title, text }, i) => (
          <div key={i} className={styles.card}>
            <Image src={icon} alt={title} width={40} height={40} />
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { Gateway };
