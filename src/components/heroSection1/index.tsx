import { Button } from "../button";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

interface HeroSection1Props {
  sectionClassName?: string;
  bgClassName?: string;
}

const HeroSection1: React.FC<HeroSection1Props> = ({
  sectionClassName,
  bgClassName,
}) => {
  return (
    <>
      <section className={`${styles.bg} ${bgClassName}`}>
        <div className={`container ${styles.section} ${sectionClassName}`}>
          <h1>Take Control Of Your Trading Journey</h1>
          <p>
            Join a global network of traders who trust FarloFX for a smarter,
            more seamless way to trade.
          </p>
          <Button variant="fill-red">
            Open Account <ArrowRight />
          </Button>
        </div>
      </section>
    </>
  );
};

export { HeroSection1 };
