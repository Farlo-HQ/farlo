import { trading_hero_1 } from "@/assets/images";
import { HeroSection2 } from "@/components/heroSection2";
import Image from "next/image";
import styles from "./styles.module.scss";
import { WhyFarlo } from "./why-farlo";
import { Spreads } from "./spreads";
import { GettingStarted } from "@/components";
import { TradingHours } from "./trading-hours";
import { FAQS } from "@/components/faqs";
import { BottomBanner } from "@/components/bottom-banner";

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
      <WhyFarlo />
      <Spreads />
      <GettingStarted greyBg />
      <TradingHours />
      <FAQS />
      <BottomBanner />
    </>
  );
};

export { ForexUI };
