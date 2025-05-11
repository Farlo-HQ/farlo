import { trading_hero_3 } from "@/assets/images";
import { HeroSection2 } from "@/components/heroSection2";
import Image from "next/image";
import styles from "./styles.module.scss";
import { WhyFarlo } from "./why-farlo";
import { Spreads } from "./spreads";
import { GettingStarted } from "@/components";
import { MarketDive } from "./market-dive";
import { FAQS } from "@/components/faqs";
import { BottomBanner } from "@/components/bottom-banner";
import { FAQData } from "@/components/faqs/accordion";

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

const CryptoUI = () => {
  return (
    <>
      <HeroSection2
        tag="CRYPTO"
        title={
          <>
            Trade Cryptocurrencies With Precision & Speed
          </>
        }
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
      <WhyFarlo />
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
