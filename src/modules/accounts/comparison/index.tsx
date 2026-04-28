import { GettingStarted } from "@/components";
import { BottomBanner } from "@/components/bottom-banner";
import { HeroSection2 } from "@/components/heroSection2";
import styles from "./styles.module.scss";
import { account_hero_mobile } from "@/assets/images";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { AccountsIntro } from "./intro";

const AccountsComparisonUI = () => {
  const { isMobile } = useDeviceSize(800);
  return (
    <>
      <HeroSection2
        tag="ACCOUNTS Comparison"
        title={<>Trading Accounts That Match Your Style</>}
        text={
          "Choose between any of our standard, professional, or VIP accounts. You can also get started with a demo account right away."
        }
        element={
          isMobile ? (
            <Image className={styles.img} src={account_hero_mobile} alt="" />
          ) : undefined
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <AccountsIntro />
      <GettingStarted greyBg />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { AccountsComparisonUI };
