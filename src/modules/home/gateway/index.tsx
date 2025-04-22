import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { cfdIcon, commoditiesIcon, cryptoIcon, forexIcon, indicesIcon, stocksIcon } from "@/assets/images/3d";

const Gateway = () => {
  const gateways = [
    {
      title: "Forex",
      text: "EURUSD, GBPUSD, NZDUSD",
      icon: forexIcon,
    },
    {
      title: "Indices",
      text: "NASDAQ100, S&P500, FTSE100",
      icon: indicesIcon,
    },
    {
      title: "Stocks",
      text: "AAPL, NVDA, MSFT",
      icon: stocksIcon,
    },
    {
      title: "Commodities",
      text: "XAU, XAG, USOIL",
      icon: commoditiesIcon,
    },
    {
      title: "Cryptocurrencies",
      text: "BTCUSD, ETHUSD, SOLUSD",
      icon: cryptoIcon,
    },
    {
      title: "CFDs",
      icon: cfdIcon,
    },
  ];
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <h2 className={styles.ttl}>Your Gateway To Global Markets</h2>
        <p className={styles.txt}>
          FarloFX connects you to the most liquid and sought-after markets in
          the world, ensuring you can trade the assets that matters most
        </p>
        <div className={styles.cards} >
          {gateways.map(({ icon, title, text }) => (
            <div className={styles.card}>
              <Image src={icon} alt={title} width={48} height={48} />
              <p className={styles.card__ttl}>{title}</p>
              {text ? <p className={styles.card__txt}>{text}</p> : null}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export { Gateway };
