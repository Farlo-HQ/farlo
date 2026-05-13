import { HeroSection2 } from "@/components/heroSection2";
import styles from "./styles.module.scss";
import { GettingStarted } from "@/components";
import { BottomBanner } from "@/components/bottom-banner";
import { WhySection } from "./why";

const PlatformWebUI = () => {
  return (
    <>
      <HeroSection2
        tag="WEB"
        title={<>Trade seamlessly from your browser</>}
        text={
          "Access the world’s financial markets directly from your web browser—whether you’re on Windows, macOS, Linux, iOS, or Android."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        btn1={{ text: "MT5 Web Terminal", action: console.log }}
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

export { PlatformWebUI };
