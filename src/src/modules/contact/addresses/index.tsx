import { Section } from "@/components";
import styles from "./styles.module.scss";

const Addresses = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.header}>
        <p className={styles.header__tag}>ADDRESSES</p>
        <h3 className={styles.header__ttl}>Our Office Addresses</h3>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.card__ttl}>NIGERIA</p>
          <div className={styles.card__breakdown}>
            <p>1620 S Whitehall Ln</p>
            <p>St Helena</p>
            <p>California</p>
            <p>United States</p>
          </div>
          <p className={styles.card__number}>(707) 967-8027</p>
        </div>
        <div className={styles.card}>
          <p className={styles.card__ttl}>KENYA</p>
          <div className={styles.card__breakdown}>
            <p>Th. K. van Lohuizenlaan 202</p>
            <p>Amsterdam</p>
            <p>1095 DW</p>
            <p>Netherlands</p>
          </div>
          <p className={styles.card__number}>(707) 967-8027</p>
        </div>
        <div className={styles.card}>
          <p className={styles.card__ttl}>SOUTH AFRICA</p>
          <div className={styles.card__breakdown}>
            <p>Th. K. van Lohuizenlaan 202</p>
            <p>Amsterdam</p>
            <p>1095 DW</p>
            <p>Netherlands</p>
          </div>
          <p className={styles.card__number}>(707) 967-8027</p>
        </div>
      </div>
    </Section>
  );
};
export { Addresses };
