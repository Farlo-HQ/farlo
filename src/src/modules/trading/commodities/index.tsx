import {
  trading_brokers,
  trading_hero_5,
} from "@/assets/images";
import { HeroSection2 } from "@/components/heroSection2";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Spreads } from "./spreads";
import { GettingStarted } from "@/components";
import { MarketDive } from "./market-dive";
import { BottomBanner } from "@/components/bottom-banner";
import { WhyFarlo } from "../_components/why-farlo";

const list = [
  {
    title: "Regulated & Trusted Broker",
    text: "Trade confidently with a globally licensed and compliant platform.",
  },
  {
    title: "Mobile-Friendly Trading",
    text: "Take full control of your trades on MT5, whether on a desktop, tablet, or smartphone.",
  },
  {
    title: "Ultra-Fast & Secure Transactions",
    text: "Deposit and withdraw funds instantly with trusted payment options.",
  },
  {
    title: "Ultra-Competitive Conditions",
    text: "Enjoy tight spreads starting from 0.6 pips and leverage up to 1:1000.",
  },
  {
    title: "Real-Time Transparent Pricing",
    text: "No hidden fees, and no manipulation. Just pure market-driven pricing.",
  },
];

const CommoditiesUI = () => {
  return (
    <>
      <HeroSection2
        tag="COMMODITIES"
        title={<>Harness The Power Of Commodities</>}
        text={
          "Trade the world’s most in-demand commodities with FarloFX and experience seamless execution, competitive pricing, and top-tier security."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        element={
          <Image
            className={styles.img}
            src={trading_hero_5}
            alt="gold bars and a dollar sign"
          />
        }
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <WhyFarlo
        tag="Why FarloFX"
        title={<>Trade With A Trusted Broker </>}
        list={list}
        image={trading_brokers}
      />
      <MarketDive />
      <Spreads />
      <GettingStarted greyBg />
      <BottomBanner
        title="Start trading the world's most popular currency pairs today"
        text="Don’t miss another market opportunity. FarloFX provides the tools, pricing, and execution speed to elevate your forex trading experience."
        fillBtn={{ text: "Blog", action: console.log }}
        outlineBtn={{ text: "Education", action: console.log }}
      />
    </>
  );
};

export { CommoditiesUI };
