import { GettingStarted, HeroSection1, Rates } from "@/components";
import styles from "./styles.module.scss";
import { Gateway } from "./gateway";

const HomeUI = () => {
  return (
    <>
      <HeroSection1
        title="Take Control Of Your Trading Journey"
        text={`Join a global network of traders who trust FarloFX for a smarter, more seamless way to trade.`}
        bgClassName={styles.bg}
      />
      <Rates />
      <Gateway />
      <GettingStarted />
    </>
  );
};

export { HomeUI };
