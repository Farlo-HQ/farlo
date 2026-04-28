import { Section } from "@/components";
import styles from "./styles.module.scss";

const list = [
  {
    title: "Register & Verify",
    text: "Sign up for a FarloFX live account and complete the verification process.",
  },
  {
    title: "Select a Payment Method",
    text: "Choose from our wide range of secure deposit and withdrawal options.",
  },
  {
    title: "Complete Your Deposit & Start Trading",
    text: "Finalize your deposit request and begin trading instantly.",
  },
];

const HowTo = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>How to deposit/withdraw</p>
        <h2 className={styles.ttl}>Fund Your Account In Three Simple Steps</h2>
        <p className={styles.txt}>
          We’re redefining the trading experience by prioritizing innovation,
          education, and trader-first solutions.
        </p>
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
