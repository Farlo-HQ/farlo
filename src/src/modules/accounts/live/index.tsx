import { BottomBanner } from "@/components/bottom-banner";
import { HeroSection2 } from "@/components/heroSection2";
import styles from "./styles.module.scss";
import { Plans } from "./plans";

const LiveAccountsUI = () => {
  return (
    <>
      <HeroSection2
        tag="live ACCOUNTS"
        title={<>Start Live Trading Today</>}
        text={
          "Compare features and find what suits you and your trading strategy the best"
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        btn1={{ text: "Register", action: console.log }}
      />
      <Plans />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { LiveAccountsUI };