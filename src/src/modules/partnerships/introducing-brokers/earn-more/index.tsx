import { Section } from "@/components";
import styles from "./styles.module.scss";
import { useState } from "react";

const EarnMore = () => {
  const [placement, setPlacement] = useState("100");
  const slide = (Number(placement) / 500) * 100;
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why Partner with FarloFX?</p>
        <h2 className={styles.ttl}>Earn more with each client you refer</h2>
        <p className={styles.txt}>
          Use our calculator to find out how much you stand to get as income
          with each client you bring to FarloFX
        </p>
      </div>
      <div className={styles.calculate}>
        <p className={styles.calculate__ttl}>Calculate your profit</p>
        <p className={styles.calculate__txt}>
          Trade with virtual funds in realistic market conditions to gain
          hands-on experience.
        </p>

        <div className={styles.slider}>
          <div className={styles.slider__label}>
            <p>$12 per lot </p>
            <p>61 Active clients</p>
          </div>
          <div className={styles.slider__rangeWrapper}>
            <div
              style={{
                width: `calc(${slide}% - 10px)`,
                height: "8px",
                backgroundColor: "var(--primary)",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                transition: "width 0.1s ease",
              }}
            ></div>
            <input
              className={styles.range}
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              type="range"
              min="10"
              max="500"
              step={"10"}
            />
          </div>
          <p className={styles.slider__amount} >
            $4,575<span>Per month</span>
          </p>
        </div>
      </div>
    </Section>
  );
};

export { EarnMore };
