import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import {
  advanced_trading,
  comp_edu,
  support_center,
  tight_spread,
  ultrafast_execution,
} from "@/assets/images";

const WhyFarlo = () => {
  const reasons = [
    {
      img: advanced_trading,
      title: "Advanced Trading Platforms",
      text: "FarloFX is available via the MT5 platform on Android, iOS, Windows, and macOS devices.",
    },
    {
      img: tight_spread,
      title: "Competitive Trading Conditions",
      text: "Enjoy spreads from 0.6 pips, execution speeds of 30ms, and leverage up to 1:1000.",
    },
    {
      img: comp_edu,
      title: "Comprehensive Educational Resources",
      text: "Stay informed with expert insights, webinars, and in-depth market analysis.",
    },
    {
      img: ultrafast_execution,
      title: "Fast & Secure Transactions",
      text: "Instant deposits and withdrawals with trusted payment providers.",
    },
    {
      img: support_center,
      title: "Dedicated Customer Support",
      text: "Our multilingual team is available 24/5 to assist you at every step.",
    },
  ];
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.sec1}>
          <p className={styles.tag}>Why FarloFX</p>
          <h3 className={styles.ttl}>A Trading Experience Like No Other</h3>
          <p className={styles.txt}>
            Choosing the right broker can make all the difference. Choose
            FarloFX.
          </p>
        </div>
        {reasons.map(({ img, text, title },index) => (
          <div className={styles.reason} key={`reason-${index}`} >
            <Image src={img} width={80} height={80} alt="" />
            <div>
              <p className={styles.reason__ttl}>{title}</p>
              <p className={styles.reason__txt}>{text}</p>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
};

export { WhyFarlo };
