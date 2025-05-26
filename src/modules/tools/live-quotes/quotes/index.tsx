import { Section } from "@/components";
import styles from "./styles.module.scss";
import { TabData, Tabs } from "@/components/tabs";
import { useState } from "react";
import { IconInfoCircle, IconInfoCircleFilled } from "@tabler/icons-react";

const Quotes = () => {
  const [tab, setTab] = useState("All");

  const tabs: TabData[] = [
    {
      title: "All",
    },
    {
      title: "Forex",
    },
    {
      title: "Commodities",
    },
    {
      title: "Indices",
    },
    {
      title: "Stocks",
    },
    {
      title: "Crypto",
    },
  ];

  const list = [
    {
      symbol: "EURUSD",
      alert: true,
      bid: { value: "1.08448", type: "green" },
      ask: { value: "1.08448", type: "green" },
      spread: { value: "0.9", type: "red" },
      time: "18:35:25",
    },
    {
      symbol: "GBPUSD",
      alert: false,
      bid: { value: "1.23456", type: "green" },
      ask: { value: "1.23460", type: "red" },
      spread: { value: "0.4", type: "red" },
      time: "18:35:30",
    },
    {
      symbol: "USDJPY",
      alert: true,
      bid: { value: "110.123", type: "green" },
      ask: { value: "110.125", type: "green" },
      spread: { value: "0.2", type: "red" },
      time: "18:35:35",
    },
    {
      symbol: "XAUUSD",
      alert: false,
      bid: { value: "1800.50", type: "green" },
      ask: { value: "1800.60", type: "green" },
      spread: { value: "0.2", type: "red" },
      time: "18:35:35",
    },
    // Add more items as needed
  ];

  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <Tabs tabs={tabs} activeTab={tab} onClick={(tab) => setTab(tab)} />

        <section className={styles.table}>
          <div className={`${styles.table__header}`}>
            <p>Symbol</p>
            <p>Alert</p>
            <p>Bid</p>
            <p>Ask</p>
            <p>
              Spread <span>pips</span>
            </p>
            <p>Time</p>
          </div>
          {list.map((item, index) => (
            <div key={`quote-${index}`} className={`${styles.table__row}`}>
              <p>{item.symbol}</p>
              <p>{item.alert && <IconInfoCircleFilled color="#ABADAE" />}</p>
              <p className={styles[item.bid.type]}>{item.bid.value}</p>
              <p className={styles[item.ask.type]}>{item.ask.value}</p>
              <p className={styles[item.spread.type]}>{item.spread.value}</p>
              <p>{item.time}</p>
            </div>
          ))}
        </section>
      </Section>
    </>
  );
};

export { Quotes };
