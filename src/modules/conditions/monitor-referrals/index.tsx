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

const MonitorReferrals = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        {/* <p className={styles.tag}>Deposit Bonus withdrawals</p> */}
        <h2 className={styles.ttl}>Monitor Your Referrals Effortlessly</h2>
        <p className={styles.txt}>
          After sending out invitations, you can easily track the status of your
          referrals in the ‘Refer a Friend’ section of your Client Area. See
          which friends have registered, how much they’ve traded, and the total
          earnings you’ve accumulated from their activity.
        </p>
      </div>
      <div className={styles.table}>
        <div className={styles.table__header}>
          <p>Name</p>
          <p>Total Traded Lots</p>
          <p>Lots</p>
          <p>Earnings USD</p>
          <p>Created at</p>
          <p>Verified</p>
          <p>Deposits USD</p>
        </div>
        <div className={styles.table__row}>
          <p>John Doe</p>
          <p>2</p>
          <p>2</p>
          <p>10</p>
          <p>24-09-24</p>
          <p>Yes</p>
          <p>300</p>
        </div>
        <div className={styles.table__row}>
          <p>John Doe</p>
          <p>2</p>
          <p>2</p>
          <p>10</p>
          <p>24-09-24</p>
          <p>Yes</p>
          <p>300</p>
        </div>
      </div>
    </Section>
  );
};

export { MonitorReferrals };
