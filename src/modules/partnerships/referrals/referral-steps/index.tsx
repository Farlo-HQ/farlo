import { Section } from "@/components";
import styles from "./styles.module.scss";

const list = [
  {
    title: "Log In",
    text: "Access your Client Area to begin the referral process.",
  },
  {
    title: "Navigate to Refer a Friend",
    text: "Locate the referral section within your account.",
  },
   {
    title: "Get Your Referral Link",
    text: "Use the automatically generated link or create a custom one.",
  },
   {
    title: "Share Your Link",
    text: "Send the link to your friends via social media or email.",
  },
   {
    title: "Track Your Earnings",
    text: "Monitor which friends have joined and how much you've earned from their trading activity in the ‘Refer a Friend’ section.",
  },
];

const ReferralSteps = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        {/* <p className={styles.tag}>Deposit Bonus withdrawals</p> */}
        <h2 className={styles.ttl}>Referral Steps to get started</h2>
        <p className={styles.txt}>
          One of the standout features of our 50% Deposit Boost is its
          withdrawable nature. Once you trade 1 lot, the bonus amount is
          transferred to your balance, allowing you to withdraw it or use it for
          further trading.
        </p>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title }, index) => (
          <div key={`referral-steps-${index}`} className={styles.card}>
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { ReferralSteps };
