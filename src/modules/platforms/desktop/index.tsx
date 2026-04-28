import { HeroSection2 } from "@/components/heroSection2";
import styles from "./styles.module.scss";
import Image from "next/image";
import { GettingStarted } from "@/components";
import { BottomBanner } from "@/components/bottom-banner";
import { mt5_desktop, mt5_desktop_mobile } from "@/assets/images";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { WhySection } from "./why";

const PlatformDesktopUI = () => {
  const { isMobile } = useDeviceSize(600);
  return (
    <>
      <HeroSection2
        tag="DESKTOP"
        title={
          <>
            Elevate your trading <br /> with MetaTrader 5
          </>
        }
        text={
          "With advanced tools, superior execution speeds, and a seamless user experience, MT5 on FarloFX unlocks a world of trading opportunities."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        element={
          <Image
            className={styles.img}
            src={isMobile ? mt5_desktop_mobile : mt5_desktop}
            alt={
              isMobile
                ? "Screen showing stock market charts"
                : "Macbook on a stool showing stock market charts"
            }
          />
        }
        btn1={{ text: "Download MT5 Desktop", action: console.log }}
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

export { PlatformDesktopUI };
