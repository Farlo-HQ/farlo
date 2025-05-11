import { Section } from "@/components";
import styles from "./styles.module.scss";
import {
  account,
  low_latency,
  professional,
  universal_compatibility,
} from "@/assets/images";
import Image from "next/image";

const WhySection = () => {
  const list = [
    {
      img: low_latency,
      title: "No Installation Required",
      text: "Trade instantly from any device, without downloading additional software.",
    },
    {
      img: universal_compatibility,
      title: "Universal Compatibility",
      text: "Works seamlessly on Windows, macOS, Linux, iOS, and Android.",
    },
    {
      img: professional,
      title: "Real-Time Market Access",
      text: "Execute trades in milliseconds with low-latency performance.",
    },
    {
      img: account,
      title: "Full Account Integration",
      text: "Supports all MT5 account types, ensuring a seamless trading experience.",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Why MT5 Web Terminal</p>
        <h2 className={styles.ttl}>
          Trade without limits <br />
          <span>No software, No barriers</span>
        </h2>
        <p className={styles.txt}>
          Access the full power of MetaTrader 5 with just a browser. Trade from
          anywhere, on any device, with the speed, security, and precision of
          the MT5 WebTerminal.
        </p>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title, img }, index) => (
          <div key={`why-farlo-${index}`} className={styles.card}>
            <Image src={img} width={48} height={48} alt={title} />
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { WhySection };
