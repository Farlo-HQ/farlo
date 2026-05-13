import { Section } from "@/components";
import styles from "./styles.module.scss";

const list = [
  {
    title: "Starter Account",
    text: "$2 USD/EUR/GBP/JPY per lot traded",
  },
  {
    title: "Professional Account",
    text: "$1 USD/EUR/GBP/JPY per lot traded",
  },
  {
    title: "VIP Account:",
    text: "$1 USD/EUR/GBP/JPY per lot traded",
  },
];

const Accounts = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Deposit Bonus withdrawals</p>
        <h2 className={styles.ttl}>Unlock Your Bonus</h2>
        <p className={styles.txt}>
          One of the standout features of our 50% Deposit Boost is its
          withdrawable nature. Once you trade 1 lot, the bonus amount is
          transferred to your balance, allowing you to withdraw it or use it for
          further trading.{" "}
        </p>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title }, index) => (
          <div key={`accounts-${index}`} className={styles.card}>
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { Accounts };
