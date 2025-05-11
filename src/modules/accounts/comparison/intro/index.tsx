import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const AccountsIntro = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.header}>
          <p className={styles.header__tag}>Intro to FarloFX Accounts</p>
          <h2 className={styles.header__ttl}>
            Unique account options tailored to your trading experience.
          </h2>
        </div>
        <div className={styles.live}>
          <div className={styles.live__intro}>
            <p className={styles.live__ttl}>Live Accounts</p>
            <ul className={styles.live__list}>
              <li>Minimum of $50 deposit</li>
              <li>Leverage of up to 1:1000</li>
              <li>Tight spreads from 0.6 pips</li>
            </ul>
          </div>
          <div className={styles.live__card}>
            <p className={styles.live__card__ttl}>STARTER </p>
            <ul className={styles.live__card__list}>
              <li>Ideal for new traders </li>
              <li>Minimum deposit of $50</li>
              <li>Spreads from 1.5 pips</li>
              <li>Leverage up to 1:500</li>
            </ul>
            <Button>
              Register <ArrowRight />
            </Button>
          </div>
          <div className={styles.live__card}>
            <p className={styles.live__card__ttl}>PROFESSIONAL </p>
            <ul className={styles.live__card__list}>
              <li>Designed for experienced traders </li>
              <li>Tighter spreads from 1.0 pips </li>
              <li>$250 minimum deposit</li>
              <li>Leverage up to 1:500</li>
            </ul>
            <Button>
              Register <ArrowRight />
            </Button>
          </div>
          <div className={styles.live__card}>
            <p className={styles.live__card__ttl}>VIP </p>
            <ul className={styles.live__card__list}>
              <li>Premium account with zero spreads </li>
              <li>$500 minimum deposit</li>
              <li>Dedicated account management </li>
              <li>Leverage up to 1:500</li>
            </ul>
            <Button>
              Register <ArrowRight />
            </Button>
          </div>
        </div>
        <div className={styles.demo}>
          <div>
            <p className={styles.demo__ttl}>Demo Account</p>
            <p className={styles.demo__txt}>
              Trade with no limits, and no problems for free. Start with a demo
              account today
            </p>
          </div>
          <Button>
            Open Demo <ArrowRight />
          </Button>
        </div>
      </Section>
    </>
  );
};

export { AccountsIntro };
