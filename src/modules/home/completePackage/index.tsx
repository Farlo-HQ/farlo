"use client"


import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const CompletePackage = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section} >
      <p className={styles.ttl}>
        FarloFX delivers the complete trading package:{" "}
        <span>Security, Transparency and Efficiency</span>
      </p>
      <div className={styles.btns}>
        <Button>
          Register <ArrowRight />{" "}
        </Button>
        <Button variant="fill-white">
          Open Demo <ArrowRight color="#575A5D" />
        </Button>
      </div>
    </Section>
  );
};

export { CompletePackage }