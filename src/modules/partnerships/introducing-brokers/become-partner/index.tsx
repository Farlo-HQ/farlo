import { Section } from "@/components";
import styles from "./styles.module.scss";
import { partnerships_ib } from "@/assets/images";
import Image from "next/image";

const BecomePartner = () => {
  const list = [
    {
      title: "Trusted in 100+ countries:",
      text: "Enjoy 24/7 tailored options that fit your business strategy, regardless of location.",
    },
    {
      title: "Real-time data",
      text: "No limits on clients or earnings, track your performance and growth easily.",
    },
    {
      title: "15+ Payment Partners",
      text: "Enjoy swift withdrawals while leveraging state-of-the-art tools and low trading costs.",
    },
    {
      title: "Great promotional tools & materials",
      text: "We will provide you with a wide variety to support your marketing efforts.",
    },
    {
      title: "Easy rebate system",
      text: "Attract clients, and pay them back a part of your partner commission.",
    },
    {
      title: "Dedicated Support",
      text: "Your success is our mission, with a dedicated manager and advanced tracking features.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why Partner with FarloFX?</p>
        <h2 className={styles.ttl}>Become a FarloFX partner today </h2>
        <p className={styles.txt}>
          Build strategies, test your hypotheses, and watch it play out in the
          real market
        </p>
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

export { BecomePartner };
