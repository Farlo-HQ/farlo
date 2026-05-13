import { Section } from "@/components";
import styles from "./styles.module.scss";
import { partnerships_mam_pamm } from "@/assets/images";
import Image from "next/image";

const WhyBonus = () => {
  const list = [
    {
      title: "Instant Margin Boost",
      text: "Receive an immediate boost to your trading margin.",
    },
    {
      title: "Quick Bonus Crediting",
      text: "Bonus is credited instantly upon deposit.",
    },
    {
      title: "1.5x Deposit Power",
      text: "Effectively multiply your deposit by 1.5x.",
    },
    {
      title: "Earn and Withdraw",
      text: "Trade to unlock the bonus and add it to your balance.",
    },
  ];

  const bonuses = [
    {
      deposit: 50,
      bonus: 25,
    },
    {
      deposit: 50,
      bonus: 50,
    },
    {
      deposit: 50,
      bonus: 500,
    },
    {
      deposit: 50,
      bonus: 5000,
    },
    {
      deposit: 50,
      bonus: 10000,
    },
  ];
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>More info on Deposit Bonus</p>
        <h2 className={styles.ttl}>Why You Need A Deposit Bonus</h2>
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
        <div className={styles.table}>
          <div className={styles.table__header}>
            <p>Your Deposit</p>
            <p>Your Bonus</p>
          </div>
          <div className={styles.table__body}>
            {bonuses.map((item, index) => (
              <div key={`bonus-${index}`} className={styles.table__row}>
                <p>${item.deposit}</p>
                <p>${item.bonus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export { WhyBonus };
