"use client"


import { Button, Section } from "@/components";
import React from "react";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import CoinsAnimation from "@/assets/animations/coins2.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Opportunity: React.FC = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <h3 className={styles.ttl}>Trade when you want. Invest when you want. Never choose.</h3>
        <p className={styles.txt}>
          One platform. Two modes. Every market. Switch between FX trading and US stock investing in seconds.
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
