import { GettingStarted, HeroSection1, Rates } from "@/components";
import styles from "./styles.module.scss";
import { Gateway } from "./gateway";
import { Opportunity } from "./opportunity";
import { TradeAnywhere } from "./trade-anywhere";
import { WhyFarlo } from "./why-farlo";
import { CompletePackage } from "./completePackage";
import CoinsAnimation from "@/assets/animations/coins3.json";
import { LearnTrade } from "./learn-trade";
import { GetHelp } from "./get-help";
import { BottomBanner } from "@/components/bottom-banner";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const HomeUI = () => {
  return (
    <>
      <HeroSection1
        title="Take Control Of Your Trading Journey"
        text={`Join a global network of traders who trust FarloFX for a smarter, more seamless way to trade.`}
        bgClassName={styles.bg}
        sectionClassName={styles.section}
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
      <LearnTrade />
      <GetHelp />
      <BottomBanner />
    </>
  );
};

export { HomeUI };
