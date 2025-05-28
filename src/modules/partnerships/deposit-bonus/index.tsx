import { BottomBanner } from "@/components/bottom-banner";
import styles from "./styles.module.scss";
import { HeroSection2 } from "@/components/heroSection2";
import { WhyBonus } from "./why-bonus";
import { GettingStarted } from "@/components";
import Image from "next/image";
import { deposit_bonus_hero } from "@/assets/images";
import { Accounts } from "./accounts";

const DepositBonusUI = () => {
  return (
    <>
      <HeroSection2
        tag="BONUSES"
        title={<>Get a 50% Deposit Bonus</>}
        text={
          "For every deposit on FarloFX, we will provide you with 50% of it in deposit bonuses immediately."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        txtClassName={styles.txt}
        btn1={{ text: "Get Bonus Now", action: console.log }}
        element={
          <Image
            width={480}
            height={480}
            src={deposit_bonus_hero}
            alt="50% off"
            className={styles.img}
          />
        }
      />
      <WhyBonus />
      <GettingStarted />
      <Accounts />
      <BottomBanner
        title="Take Your Trading To The Next Level"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};
export { DepositBonusUI };
