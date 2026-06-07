

import { BottomBanner } from "@/components/bottom-banner";
import styles from "./styles.module.scss";
import { HeroSection2 } from "@/components/heroSection2";
import { BecomePartner } from "./become-partner";
import { GettingStarted } from "@/components";

const MamPammUI = () => {
  return (
    <>
      <HeroSection2
        tag="Partnerships"
        title={<>Grow with FARLO. Earn while your clients trade.</>}
        text={
          "Three partnership models built for professionals who manage capital or bring clients to the platform."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        txtClassName={styles.txt}
        btn1={{ text: "Get Started", action: console.log }}
      />
      <BecomePartner />
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
export { MamPammUI };