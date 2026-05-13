import { HeroSection1 } from "@/components";
import styles from "./styles.module.scss";
import { WhoWeAre } from "./who-we-are";
import { Stats } from "./stats";
import { WhyFarlo } from "./why-farlo";
import { Mission } from "./mission";
import { Note } from "./note";
import { OurPromise } from "./promise";
import { JoinFarlo } from "./join-farlo";
import { BottomBanner } from "@/components/bottom-banner";
import dynamic from "next/dynamic";
import CoinsAnimation from "@/assets/animations/coins.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AboutUI = () => {
  return (
    <>
      <HeroSection1
        tag="About us"
        title={
          <>
            FarloFX Is
            <br /> Empowering Traders
          </>
        }
        text={`We provide traders across Africa and beyond with cutting-edge technology, and deep market insights.`}
        bgClassName={styles.bg}
        sectionClassName={styles.section}
        txtClassName={styles.txt}
        element={
          <>
            <div className={styles.overlay}></div>
            <Lottie
              className={styles.animation_wrapper}
              animationData={CoinsAnimation}
              loop={true}
            />
          </>
        }
      />
      <WhoWeAre />
      <Stats />
      <WhyFarlo />
      <Mission />
      <Note />
      <OurPromise />
      <JoinFarlo />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { AboutUI };
