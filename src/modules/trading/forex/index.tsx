import { trading_forex_coins, trading_hero_1 } from "@/assets/images";
import { HeroSection2 } from "@/components/heroSection2";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Spreads } from "./spreads";
import { GettingStarted } from "@/components";
import { TradingHours } from "./trading-hours";
import { FAQS } from "@/components/faqs";
import { BottomBanner } from "@/components/bottom-banner";
import { FAQData } from "@/components/faqs/accordion";
import { WhyFarlo } from "../_components/why-farlo";

const faqs: FAQData[] = [
  {
    question: "Is Farlo FX regulated?",
    answer:
      "Farlo FX is a regulated broker, holding multiple regulatory licenses from several financial authorities across the globe such as the Seychelles Financial Services Authority (FSA), Cyprus Securities and Exchange Commission (CySEC)*, the Financial Conduct Authority (FCA) in the UK*, South Africa Financial Sector Conduct Authority (FSCA), Central Bank of Curacao and Sint Maarten (CBCS), Financial Services Commission (FSC) in the British Virgin Islands, Financial Services Commission (FSC) in Mauritius, Capital Markets Authority (CMA) in Kenya, and the Jordan Securities Commission (JSC).",
  },
  {
    question: "In which countries is Farlo FX regulated?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
  {
    question:
      "What is the difference between a regulated broker and an unregulated broker",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
  {
    question: "How can I create an Farlo account?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
];

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

const ForexUI = () => {
  return (
    <>
      <HeroSection2
        tag="FOREX"
        title={
          <>
            Dominate the forex <br />
            market with precision
          </>
        }
        text={
          "Trade the world's most liquid currency pairs under superior conditions—tight spreads, lightning-fast execution, and flexible leverage designed for success."
        }
        bgClassName={styles.bg}
        element={
          <Image
            className={styles.img}
            src={trading_hero_1}
            alt="currencies wrapped around a twisting arrow pointing upwards"
          />
        }
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <WhyFarlo
        tag="Why FarloFX"
        title={
          <>
            Your <span>forex advantage</span> starts here
          </>
        }
        list={list}
        image={trading_forex_coins}
      />
      <Spreads />
      <GettingStarted greyBg />
      <TradingHours />
      <FAQS title="Frequently asked questions" faqs={faqs} />
      <BottomBanner />
    </>
  );
};

export { ForexUI };
