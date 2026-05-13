import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const list = [
  {
    title: "Select Account Type",
    text: "Choose your FarloFX account type, then specify your leverage and base currency.",
  },
  {
    title: "Choose Your Trading Instrument",
    text: "Pick the forex pair, commodity, index, or cryptocurrency you want to trade.",
  },
  {
    title: "Set Lot Size & Calculate",
    text: "Enter your lot size and hit ‘Calculate’ for instant, precise results.",
  },
];

const HowTo = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>How to use the calculator</p>
        <h2 className={styles.ttl}>Calculations Tailored To Your Trading Strategy.</h2>
        <p className={styles.txt}>
        For a detailed guide, visit our FAQ section.
        </p>
        <Button>Visit FAQs <ArrowRight /></Button>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title }, index) => (
          <div key={`why-farlo-${index}`} className={styles.card}>
            <p className={styles.card__num}>{index + 1}</p>
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { HowTo };
