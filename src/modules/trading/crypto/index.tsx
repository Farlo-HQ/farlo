import { trading_crypto_coins, trading_hero_3 } from "@/assets/images";
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

const CryptoUI = () => {
  return (
    <>
      <HeroSection2
        tag="CRYPTO"
        title={<>Trade Cryptocurrencies With Precision & Speed</>}
        text={
          "Access and trade top cryptocurrencies like BTCUSD and ETHUSD with zero overnight fees and seamless execution."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        element={
          <Image
            className={styles.img}
            src={trading_hero_3}
            alt="crypto coins charting upwards"
          />
        }
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <WhyFarlo
        tag="How it works"
        title={
          <>
            {" "}
            A Smarter Way To <span>Trade</span> Digital Assets
          </>
        }
        list={list}
        image={trading_crypto_coins}
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

export { CryptoUI };
