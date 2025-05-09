import { Button, Section } from "@/components";
import React from "react";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Lottie from "lottie-react";
import CoinsAnimation from "@/assets/animations/coins2.json";

const Opportunity: React.FC = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <h3 className={styles.ttl}>A world of opportunity, on one platform</h3>
        <p className={styles.txt}>
          With over 350 instruments at your fingertips, you can build a trading
          strategy that aligns with your financial goals.
        </p>
        <div className={styles.btns}>
          <Button>
            Open Demo <ArrowRight />{" "}
          </Button>
          <Button variant="fill-white">
            Setup Live <ArrowRight color="#575A5D" />
          </Button>
        </div>
      </div>
      <div className={styles.animation_wrapper} >
        <Lottie className={styles.animation} animationData={CoinsAnimation} loop={true} />
      </div>
    </Section>
  );
};

export { Opportunity };
