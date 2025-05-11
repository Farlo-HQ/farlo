import { Section } from "@/components";
import styles from "./styles.module.scss";
import {
  grad_hat,
  horse_head,
  mobile_market_chart,
  prop_trading,
  tight_spread,
} from "@/assets/images";
import Image from "next/image";

const WhySection = () => {
  const list = [
    {
      img: grad_hat,
      title: "Learn Without Risk",
      text: "Trade with virtual funds in realistic market conditions to gain hands-on experience.",
    },
    {
      img: horse_head,
      title: "Update Your Strategies",
      text: "Test and perfect your trading approach before committing real capital.",
    },
    {
      img: tight_spread,
      title: "Do It With MT5",
      text: "Explore MT5’s full suite of tools and features without financial pressure.",
    },
    {
      img: prop_trading,
      title: "Become A Better Trader",
      text: "Strengthen your ability to analyze markets and execute trades confidently.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why Choose a FarloFX Demo Account</p>
        <h2 className={styles.ttl}>
          Trade With Zero Risk and Real Market Conditions
        </h2>
        <p className={styles.txt}>
          Build strategies, test your hypotheses, and watch it play out in the
          real market
        </p>
      </div>
      <div className={styles.content}>
        <Image
          src={mobile_market_chart}
          alt="Phone screen showing market chart"
          width={500}
          height={500}
        />
        <div className={styles.cards}>
          {list.map(({ text, title, img }, index) => (
            <div key={`why-farlo-${index}`} className={styles.card}>
              <Image src={img} width={48} height={48} alt={title} />
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { WhySection };
