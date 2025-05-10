import { HeroSection1 } from "@/components";
import styles from "./styles.module.scss";
import { WhoWeAre } from "./who-we-are";
import { Stats } from "./stats";
import { WhyFarlo } from "./why-farlo";
import { Mission } from "./mission";
import { Note } from "./note";
import { OurPromise } from "./promise";

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
        txtClassName={styles.txt}
        element={
          <>
            {/* <div className={styles.overlay}></div>
             <Lottie
               className={styles.animation_wrapper}
               animationData={CoinsAnimation}
              loop={true}
             /> */}
          </>
        }
      />
      <WhoWeAre />
      <Stats />
      <WhyFarlo />
      <Mission />
      <Note />
      <OurPromise />
    </>
  );
};

export { AboutUI };
