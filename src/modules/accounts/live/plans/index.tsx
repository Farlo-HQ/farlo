import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Image from "next/image";
import { professional_plan, starter_plan, vip_plan } from "@/assets/images";

const Plans = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.plan}>
        <div className={styles.plan__header}>
          <Image src={starter_plan} alt="" width={40} height={40} />
          <p className={styles.plan__header__ttl}>Starter</p>
          <p className={styles.plan__header__txt}>Ideal for new traders</p>
        </div>
        <ul className={styles.plan__list}>
          <li>Minimum deposit of $50</li>
          <li>Spreads from 1.5 pips</li>
          <li>Leverage up to 1:500</li>
        </ul>
        <Button>
          Register <ArrowRight />
        </Button>
      </div>
      <div className={styles.plan}>
        <div className={styles.plan__header}>
          <Image src={professional_plan} alt="" width={40} height={40} />
          <p className={styles.plan__header__ttl}>Professional</p>
          <p className={styles.plan__header__txt}>Designed for experienced traders</p>
        </div>
        <ul className={styles.plan__list}>
          <li>Minimum deposit of $50</li>
          <li>Spreads from 1.5 pips</li>
          <li>Leverage up to 1:500</li>
        </ul>
        <Button>
          Register <ArrowRight />
        </Button>
      </div>
      <div className={styles.plan}>
        <div className={styles.plan__header}>
          <Image src={vip_plan} alt="" width={40} height={40} />
          <p className={styles.plan__header__ttl}>V.I.P</p>
          <p className={styles.plan__header__txt}>Premium account with zero spreads</p>
        </div>
        <ul className={styles.plan__list}>
          <li>Minimum deposit of $500</li>
          <li>Dedicated account management</li>
          <li>Leverage up to 1:1000</li>
        </ul>
        <Button>
          Register <ArrowRight />
        </Button>
      </div>
    </Section>
  );
};

export { Plans };
