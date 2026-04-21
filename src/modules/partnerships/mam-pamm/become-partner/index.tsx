// import { Section } from "@/components";
// import styles from "./styles.module.scss";
// import { partnerships_mam_pamm } from "@/assets/images";
// import Image from "next/image";

// const BecomePartner = () => {
//   const list = [
//     {
//       title: "Advanced Allocation",
//       text: "Utilize state-of-the-art post-trade allocation tools for precise management.",
//     },
//     {
//       title: "Automated Trading",
//       text: "Implement Expert Advisor (EA) strategies across managed accounts",
//     },
//     {
//       title: "Limitless Sub-Accounts:",
//       text: "Manage numerous sub-accounts with varied strategies.",
//     },
//     {
//       title: "Efficient Execution:",
//       text: "Execute bulk orders with STP on the master account.",
//     },
//     {
//       title: "Real-Time Insights",
//       text: "Monitor commissions and performance instantly.",
//     },
//     {
//       title: "No Restrictions:",
//       text: "Enjoy unlimited trading accounts and deposit flexibility.",
//     },
//   ];
//   return (
//     <Section sectionClassName={styles.section}>
//       <div className={styles.sec1}>
//         <p className={styles.tag}>Why Partner with FarloFX?</p>
//         <h2 className={styles.ttl}>A Unified Platform for Your Success </h2>
//         <p className={styles.txt}>
//           FarloFX offers a robust MAM/PAMM solution that allows you to oversee
//           multiple trading accounts from one master account. Seamlessly
//           integrated with MetaTrader 5, this platform ensures a cohesive trading
//           experience with direct connectivity and advanced management tools.{" "}
//         </p>
//       </div>
//       <div className={styles.content}>
//         <Image
//           src={partnerships_mam_pamm}
//           alt="Man typing on a laptop placed on a table"
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
import { partnerships_mam_pamm } from "@/assets/images";
import Image from "next/image";
import { ArrowRight } from "@/assets/icons/arrow-right";

const BecomePartner = () => {
  const models = [
    {
      title: "MAM Account",
      text: "Trade one master account and have all sub-accounts mirror your positions proportionally. Ideal for fund managers running a single strategy across multiple clients.",
      specifics: "Minimum managed AUM: $5,000. Performance fee: negotiable. Sub-accounts: unlimited. Reporting: real-time via FARLO dashboard.",
    },
    {
      title: "PAMM Account",
      text: "Clients allocate capital to your strategy. You trade. Profits are distributed proportionally. Full transparency for investors, full control for you.",
      specifics: "Minimum strategy AUM: $2,000. Performance fee: set by manager (typically 10 to 30%). Lock-up period: defined per strategy. Full audit trail.",
    },
  ];

  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Partnership Models</p>
        <h2 className={styles.ttl}>Choose the model that fits how you manage money</h2>
      </div>
      <div className={styles.content}>
        <Image
          src={partnerships_mam_pamm}
          alt="Man typing on a laptop placed on a table"
          width={500}
          height={500}
        />
        <div className={styles.cards}>
          {models.map(({ text, title, specifics }, index) => (
            <div key={`model-${index}`} className={styles.card}>
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
              <p className={styles.card__specifics}>{specifics}</p>
            </div>
          ))}
          <Button className={styles.cta}>
            Apply as a Fund Manager <ArrowRight />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export { BecomePartner };