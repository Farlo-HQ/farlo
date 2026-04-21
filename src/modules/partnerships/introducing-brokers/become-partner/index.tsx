// import { Section } from "@/components";
// import styles from "./styles.module.scss";
// import { partnerships_ib } from "@/assets/images";
// import Image from "next/image";

// const BecomePartner = () => {
//   const list = [
//     {
//       title: "Trusted in 100+ countries:",
//       text: "Enjoy 24/7 tailored options that fit your business strategy, regardless of location.",
//     },
//     {
//       title: "Real-time data",
//       text: "No limits on clients or earnings, track your performance and growth easily.",
//     },
//     {
//       title: "15+ Payment Partners",
//       text: "Enjoy swift withdrawals while leveraging state-of-the-art tools and low trading costs.",
//     },
//     {
//       title: "Great promotional tools & materials",
//       text: "We will provide you with a wide variety to support your marketing efforts.",
//     },
//     {
//       title: "Easy rebate system",
//       text: "Attract clients, and pay them back a part of your partner commission.",
//     },
//     {
//       title: "Dedicated Support",
//       text: "Your success is our mission, with a dedicated manager and advanced tracking features.",
//     },
//   ];
//   return (
//     <Section sectionClassName={styles.section}>
//       <div className={styles.sec1}>
//         <p className={styles.tag}>Why Partner with FarloFX?</p>
//         <h2 className={styles.ttl}>Become a FarloFX partner today </h2>
//         <p className={styles.txt}>
//           Build strategies, test your hypotheses, and watch it play out in the
//           real market
//         </p>
//       </div>
//       <div className={styles.content}>
//         <Image
//           src={partnerships_ib}
//           alt="Two people shaking hands"
//           width={500}
//           height={500}
//         />
//         <div className={styles.cards}>
//           {list.map(({ text, title }, index) => (
//             <div key={`why-farlo-${index}`} className={styles.card}>
//               <p className={styles.card__ttl}>{title}</p>
//               <p className={styles.card__txt}>{text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Section>
//   );
// };

// export { BecomePartner };

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