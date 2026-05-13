import { BottomBanner } from "@/components/bottom-banner";
import styles from "./styles.module.scss";
import { HeroSection2 } from "@/components/heroSection2";
import { LowSpreads } from "./low-spreads";
import { GettingStarted } from "@/components";
import { FAQS } from "@/components/faqs";
import { FAQData } from "@/components/faqs/accordion";
import { MarginAndLeverage } from "./margin-and-leverage";
import { TradingHours } from "./trading-hours";
import { TradingAdvantages } from "./trading-advantages";
import { SwapRates } from "./swap-rates";
import { LowLatency } from "./low-latency";

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

const ConditionsUI = () => {
  return (
    <>
      <HeroSection2
        tag="CONDITIONS"
        title={<>FarloFX trading conditions are designed for your success</>}
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        txtClassName={styles.txt}
      />
      <LowSpreads />
      <MarginAndLeverage />
      <TradingHours />
      <SwapRates />
      <TradingAdvantages />
      <LowLatency />
      <GettingStarted />
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
export { ConditionsUI };
