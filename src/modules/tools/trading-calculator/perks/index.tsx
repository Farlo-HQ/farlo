import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import {
  money_receive,
  money_remove,
  universal_compatibility,
} from "@/assets/images";
import Image from "next/image";

const list = [
  {
    img: universal_compatibility,
    alt: "universe icon",
    title: "Global & Local Payment Methods",
    text: "Enjoy seamless transactions via bank transfers, e-wallets, and crypto payments.",
  },
  {
    img: money_remove,
    alt: "money remove",
    title: "Zero Hidden Fees",
    text: "We cover third-party transaction fees, so you get full control over your money.",
  },
  {
    img: money_receive,
    alt: "money receive",
    title: "Instant Withdrawals",
    text: "Access your funds anytime with rapid processing speeds.",
  },
];

const Perks = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Perks</p>
        <h3 className={styles.ttl}>
        Eliminate Guesswork, Use The Calculator
        </h3>
        <div className={styles.ctas}>
          <Button>
            Setup Live <ArrowRight />
          </Button>
          <Button variant="grey">
            Deposit <ArrowRight />
          </Button>
        </div>
      </div>
     <div>
      calculator
     </div>
    </Section>
  );
};

export { Perks };
