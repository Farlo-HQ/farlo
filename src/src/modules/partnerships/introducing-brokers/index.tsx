import { BottomBanner } from "@/components/bottom-banner";
import styles from "./styles.module.scss";
import { HeroSection2 } from "@/components/heroSection2";
import { EarnMore } from "./earn-more";
import { BecomePartner } from "./become-partner";
import { WhySection } from "./why";
import { GettingStarted } from "@/components";

const IntroducingBrokersUI = () => {
  return (
    <>
      <HeroSection2
        tag="Partnerships"
        title={<>Join FarloFX As An Introducing Broker</>}
        text={
          "Become an introducing broker and earn from partnership commissions"
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        txtClassName={styles.txt}
        btn1={{ text: "Get Started", action: console.log }}
      />
      <EarnMore />
      <BecomePartner />
      <WhySection />
      <GettingStarted /> {/* Change here */}
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};
export { IntroducingBrokersUI };
