import { HeroSection2 } from "@/components/heroSection2";
import styles from "./styles.module.scss";
import Image from "next/image";
import { GettingStarted } from "@/components";
import { BottomBanner } from "@/components/bottom-banner";
import { mt5_desktop_mobile, mt5_mobile } from "@/assets/images";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { WhySection } from "./why";

const PlatformMobileUI = () => {
  const { isMobile } = useDeviceSize(600);
  return (
    <>
      <HeroSection2
        tag="MOBILE"
        title={<>Power your trades with the MT5 Mobile App</>}
        text={
          "Execute trades, analyze markets, and stay connected to real-time price movements, all from the palm of your hand."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        element={
          <Image
            className={styles.img}
            src={mt5_mobile}
            alt={
              isMobile
                ? "Screen showing stock market charts"
                : "Mobile phone showing stock market charts"
            }
          />
        }
        btn1={{ text: "Download MT5 Mobile", action: console.log }}
        btn2={{ text: "Register", action: console.log }}
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

export { PlatformMobileUI };
