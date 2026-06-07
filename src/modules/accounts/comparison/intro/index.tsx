

import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const tableRows = [
  { label: "Purpose", demo: "Practice risk-free", standard: "Active everyday trading", pro: "High-volume professionals" },
  { label: "Minimum deposit", demo: "None", standard: "$100", pro: "$1,000" },
  { label: "Spreads", demo: "From 0.6 pips", standard: "From 0.8 pips", pro: "From 0.6 pips (raw)" },
  { label: "Leverage", demo: "Up to 1:500", standard: "Up to 1:500", pro: "Up to 1:1000" },
  { label: "Commission", demo: "None", standard: "None", pro: "$3 per lot" },
  { label: "Copy trading", demo: "Yes", standard: "Yes", pro: "Yes" },
  { label: "Investing Mode", demo: "No", standard: "Yes", pro: "Yes" },
  { label: "Islamic option", demo: "No", standard: "Yes", pro: "Yes" },
];

const AccountsIntro = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.header}>
          <p className={styles.header__tag}>Intro to Farlo Accounts</p>
          <h2 className={styles.header__ttl}>
            Unique account options tailored to your trading experience.
          </h2>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Demo Account</th>
                <th>Standard Account</th>
                <th>Pro Account</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.label}>
                  <td className={styles.rowLabel}>{row.label}</td>
                  <td>{row.demo}</td>
                  <td>{row.standard}</td>
                  <td>{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.recommendation}>
          <p className={styles.recommendation__text}>
            Not sure where to start? Open a demo account first, practice with $10,000 in virtual funds, and switch to live when you are ready. It takes two minutes and no card.
          </p>
          <div className={styles.recommendation__ctas}>
            <Button>
              Open Demo Account <ArrowRight />
            </Button>
            <Button variant="outline-red">
              Open Live Account <ArrowRight />
            </Button>
          </div>
        </div>

        <div className={styles.deposits}>
          <p className={styles.deposits__label}>DEPOSITS AND WITHDRAWALS</p>
          <div className={styles.deposits__grid}>
            <div>
              <p className={styles.deposits__subLabel}>Deposit methods</p>
              <p className={styles.deposits__value}>
                Paystack (NGN, GHS, KES) &nbsp;|&nbsp; USDT (TRC20, ERC20) &nbsp;|&nbsp; Card (Visa, Mastercard) &nbsp;|&nbsp; Bank wire (SWIFT)
              </p>
            </div>
            <div>
              <p className={styles.deposits__subLabel}>Minimums &amp; processing</p>
              <p className={styles.deposits__value}>
                Minimum deposit: $100 &nbsp;|&nbsp; Minimum withdrawal: $50 &nbsp;|&nbsp; Processing: instant for Paystack and USDT, 1 to 3 days for wire
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export { AccountsIntro };
