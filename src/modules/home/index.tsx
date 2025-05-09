import { GettingStarted, HeroSection1, Rates } from "@/components";
import styles from "./styles.module.scss";
import { Gateway } from "./gateway";
import { Opportunity } from "./opportunity";
import { TradeAnywhere } from "./trade-anywhere";
import { WhyFarlo } from "./why-farlo";
import { CompletePackage } from "./completePackage";
import Lottie from "lottie-react";
import CoinsAnimation from "@/assets/animations/coins.json";

const HomeUI = () => {
  return (
    <>
      <HeroSection1
        title="Take Control Of Your Trading Journey"
        text={`Join a global network of traders who trust FarloFX for a smarter, more seamless way to trade.`}
        bgClassName={styles.bg}
        element={
          <>
            <div className={styles.overlay}></div>
            <Lottie
              className={styles.animation_wrapper}
              animationData={CoinsAnimation}
              loop={true}
            />
          </>
        }
      />
      <Rates />
      <Gateway />
      <GettingStarted />
      <Opportunity />
      <TradeAnywhere />
      <WhyFarlo />
      <CompletePackage />
    </>
  );
};

export { HomeUI };
