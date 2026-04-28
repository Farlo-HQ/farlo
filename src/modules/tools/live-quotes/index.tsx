import { HeroSection3 } from "@/components/heroSection3";
import styles from "./styles.module.scss";
import { BottomBanner } from "@/components/bottom-banner";
import { Quotes } from "./quotes";

const LiveQuotesUI = () => {
  return (
    <>
      <HeroSection3
        title={<>Live Quotes For All Markets</>}
        text={
          "FarloFX’s investment calculator helps you instantly compute pips, margin, spread, commission, and more."
        }
        sectionClassName={styles.hero}
        noElement
      />
      <Quotes />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { LiveQuotesUI };
