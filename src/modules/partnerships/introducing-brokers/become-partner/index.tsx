

import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { partnerships_ib } from "@/assets/images";
import Image from "next/image";
import { ArrowRight } from "@/assets/icons/arrow-right";

const BecomePartner = () => {
  const list = [
    {
      title: "Commission up to $8 per lot",
      text: "Earn on every standard lot your referred clients trade, with no cap on how much you can earn.",
    },
    {
      title: "Monthly payouts",
      text: "Commissions are calculated and paid out monthly, directly to your account.",
    },
    {
      title: "Sub-IB program available",
      text: "Build your own network. Recruit sub-IBs and earn from their referrals too.",
    },
    {
      title: "No minimum client count",
      text: "Start earning from your very first referral. There is no threshold to meet before commissions kick in.",
    },
    {
      title: "Dedicated account manager",
      text: "A dedicated manager is assigned at onboarding to support your growth and answer questions.",
    },
    {
      title: "Real-time dashboard",
      text: "Track your referred clients, trading volumes, and commission earnings in real time.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why partner with FARLO as an IB?</p>
        <h2 className={styles.ttl}>Everything you need to build a referral business</h2>
      </div>
      <div className={styles.content}>
        <Image
          src={partnerships_ib}
          alt="Two people shaking hands"
          width={500}
          height={500}
        />
        <div className={styles.cards}>
          {list.map(({ text, title }, index) => (
            <div key={`ib-${index}`} className={styles.card}>
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          ))}
          <Button className={styles.cta}>
            Apply as an Introducing Broker <ArrowRight />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export { BecomePartner };