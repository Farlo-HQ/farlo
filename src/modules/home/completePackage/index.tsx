"use client"


import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const CompletePackage = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section} >
      <div className={styles.text}>
        <p className={styles.ttl}>
          The platform your market has been waiting for.{" "}
          <span>One account. Every market. Built for Emerging markets.</span>
        </p>
        <h4>Join a community of traders and investors across Emerging markets. Open your account in minutes.</h4>
      </div>


      <div className={styles.btns}>
        <Button
          onClick={() => window.open("https://accounts.farlofx.com/auth/register", "_blank", "noopener,noreferrer")}
        >
          Open Account <ArrowRight />{" "}

        </Button>
        {/* <Button variant="fill-white">
          Open Demo <ArrowRight color="#575A5D" />
        </Button> */}
      </div>
    </Section>
  );
};

export { CompletePackage }