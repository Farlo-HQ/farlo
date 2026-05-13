import { trading_hero_4, trading_stocks } from "@/assets/images";
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
    title: "Advanced Trading Platforms",
    text: "Execute trades on MT5, equipped with built-in indicators, technical analysis tools, and fully customizable reports."
  },
  {
    title: "Ultra-Competitive Conditions",
    text: "Enjoy raw spreads from 0.0 pips, execution speeds as low as 30 milliseconds, and leverage up to 1:1000.",
  },
  {
    title: "Secure & Instant Transactions",
    text: "Deposit and withdraw seamlessly with multiple payment options and segregated client accounts.",
  },
  {
    title: "Market Education & Insights",
    text: "Access in-depth eBooks, webinars, and expert market analysis to refine your trading strategy.",
  },
  {
    title: "Dedicated Customer Support",
    text: "Our multilingual support team is available 24/5 to assist with any trading inquiries.",
  },
];

const StocksUI = () => {
  return (
    <>
      <HeroSection2
        tag="STOCKS"
        title={<>Access The World’s Biggest Companies</>}
        text={"Gain direct access to global stock markets and trade shares of top-performing companies with minimal transaction costs."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        element={
          <Image
            className={styles.img}
            src={trading_hero_4}
            alt="Pie chart and coins"
          />
        }
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <WhyFarlo
        tag="Why FarloFX"
        title={
          <>
           Stock Trading Made Easy
          </>
        }
        list={list}
        image={trading_stocks}
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

export { StocksUI };
