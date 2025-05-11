import { trading_hero_2, trading_indices } from "@/assets/images";
import { HeroSection2 } from "@/components/heroSection2";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Spreads } from "./spreads";
import { GettingStarted } from "@/components";
import { MarketDive } from "./market-dive";
import { FAQS } from "@/components/faqs";
import { BottomBanner } from "@/components/bottom-banner";
import { FAQData } from "@/components/faqs/accordion";
import { WhyFarlo } from "../_components/why-farlo";

const faqs: FAQData[] = [
  {
    question: "What are indices in trading?",
    answer:
      "Indices are measures of the performance of a group of assets, typically stocks. They allow traders to speculate on the broader market trends without investing in individual stocks.",
  },
  {
    question: "How does index trading work?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
  {
    question: "How can you trade on indices profitably?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
];

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

const IndicesUI = () => {
  return (
    <>
      <HeroSection2
        tag="INDICES"
        title={
          <>
            Trade Your <br />
            Favourite Indexes
          </>
        }
        text={
          "Gain exposure to the most liquid and influential indices from global financial markets."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        element={
          <Image
            className={styles.img}
            src={trading_hero_2}
            alt="stacked coins"
          />
        }
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <WhyFarlo
        tag="Why FarloFX"
        title={
          <>
            Benefits of trading indices on <span>FarloFX</span>
          </>
        }
        list={list}
        image={trading_indices}
      />
      <MarketDive />
      <Spreads />
      <GettingStarted greyBg />
      <FAQS title="FarloFX Index Trading FAQs" faqs={faqs} />
      <BottomBanner
        title="Start trading the world's most popular currency pairs today"
        text="Don’t miss another market opportunity. FarloFX provides the tools, pricing, and execution speed to elevate your forex trading experience."
        fillBtn={{ text: "Blog", action: console.log }}
        outlineBtn={{ text: "Education", action: console.log }}
      />
    </>
  );
};

export { IndicesUI };
