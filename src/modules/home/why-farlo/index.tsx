"use client"


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
      title: "30ms execution",
      text: "Orders fill via MT5 infrastructure at institutional speed. No requotes.",
    },
    {
      img: tight_spread,
      img_size: 48,
      title: "Local deposits",
      text: "Fund via Paystack, USDT, or bank transfer. No wire. No delays.",
    },
    {
      img: one_to_1000,
      img_size: 48,
      title: "Instant transfers",
      text: "Move profits between Trading and Investing in seconds. No fee.",
    },
    {
      img: islamic_acc,
      img_size: 48,
      title: "Regulated rails",
      text: "US equities via Alpaca. FX via licensed UpTrader infrastructure.",
    },
    {
      img: live_quotes,
      img_size: 48,
      title: "Live quotes always",
      text: "Real-time pricing across all 350+ instruments. No refresh needed.",
    },
    {
      img: low_latency,
      img_size: 48,
      title: "One KYC. All access.",
      text: "Verify once. Unlock FX, copy trading, and US equities simultaneously.",
    },
    {
      img: copy_social,
      img_size: 40,
      title: "Copy top traders",
      text: "Audited returns. Real drawdown data. Follow and allocate in one click.",
    },
    {
      img: prop_trading,
      img_size: 40,
      title: "US stocks from Africa",
      text: "AAPL, NVDA, SPY from Accra or Cairo. No US bank account needed.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why FARLO</p>
        <h5 className={styles.ttl}>The platform built for your market.</h5>
        {/* <p className={styles.txt}>
          Built for Africa and emerging markets. Real specs, not marketing claims.
        </p> */}
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
