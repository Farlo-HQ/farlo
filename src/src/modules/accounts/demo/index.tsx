import { BottomBanner } from "@/components/bottom-banner";
import { HeroSection2 } from "@/components/heroSection2";
import styles from "./styles.module.scss";
import { WhySection } from "./why";
import { GettingStarted } from "@/components";

const DemoAccountsUI = () => {
  return (
    <>
      <HeroSection2
        tag="DEMO ACCOUNTS"
        title={<>Sharpen Your Edge With Risk-free trading</>}
        text={"Trade With Zero Risk and Real Market Conditions"}
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        btn1={{ text: "Open Demo", action: console.log }}
      />
      <WhySection />
      <GettingStarted />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { DemoAccountsUI };
