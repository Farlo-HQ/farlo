import { BottomBanner } from "@/components/bottom-banner";
import styles from "./styles.module.scss";
import { HeroSection2 } from "@/components/heroSection2";
import { ReferralBenefits } from "./benefits";
import { GettingStarted } from "@/components";
import Image from "next/image";
import { referral_hero } from "@/assets/images";
import { ReferralSteps } from "./referral-steps";
import { MonitorReferrals } from "./monitor-referrals";

const ReferralsUI = () => {
  return (
    <>
      <HeroSection2
        tag="Referrals"
        title={<>Earn as Your Friends Trade</>}
        text={
          "With FarloFX's Refer a Friend program, you can invite your friends to trade and earn rewards as they do."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        txtClassName={styles.txt}
        btn1={{ text: "Refer a Friend", action: console.log }}
        element={
          <Image
            width={578.5}
            height={578.5}
            src={referral_hero}
            alt="magnet attracting poeple"
            className={styles.img}
          />
        }
      />
      <GettingStarted />
      <ReferralSteps />
      <MonitorReferrals />
      <ReferralBenefits />
      <BottomBanner
        title="Take Your Trading To The Next Level"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};
export { ReferralsUI };
