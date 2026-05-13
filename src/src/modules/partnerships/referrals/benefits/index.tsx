import { Section } from "@/components";
import styles from "./styles.module.scss";

const ReferralBenefits = () => {
  const list = [
    {
      title: "Cost-Effective Trading",
      text: "Start trading with spreads from 0.6 pips and zero commissions. Choose from Starter, Professional, and VIP accounts with a minimum deposit of $50.",
    },
    {
      title: "Superior Trading Conditions:",
      text: "Enjoy ultra-fast execution with no slippage, requotes, or order rejections.",
    },
    {
      title: "Secure Fund Management",
      text: "Your funds are kept in segregated accounts with negative balance protection.",
    },
    {
      title: "Excellent Client Support",
      text: "Access 24/5 live support in multiple languages and a comprehensive FAQ center.",
    },
    {
      title: "Versatile Funding Options",
      text: "Experience instant deposits and fast withdrawals with major banks and payment providers worldwide.",
    },
    {
      title: "Diverse Market Access",
      text: "Trade forex pairs, commodities, indices, crypto, and stocks seamlessly.",
    },
  ];

  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        {/* <p className={styles.tag}>More info on Deposit Bonus</p> */}
        <h2 className={styles.ttl}>Benefits of FarloFX Referral Program</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.cards}>
          {list.map(({ text, title }, index) => (
            <div key={`why-farlo-${index}`} className={styles.card}>
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { ReferralBenefits };
