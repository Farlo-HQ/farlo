import { Section } from "@/components";
import styles from "./styles.module.scss";
import {
  SpreadTable,
  TableHeaderProps,
  TableRowProps,
} from "../../../../components/table";

const Spreads = () => {
  const tableHeader: TableHeaderProps = {
    title: "Symbol",
    items: [
      {
        label: "Avg. Spread",
        sup: "1",
        unit: "pipipsp",
        key: "avg_spread",
      },
      {
        label: "Commission",
        unit: "per lot/side",
        key: "commission",
      },
      {
        label: "Margin",
        unit: "1:500",
        key: "margin",
      },
      {
        label: "Long swap",
        unit: "pips",
        key: "long_swap",
      },
      {
        label: "Short swap",
        unit: "pips",
        key: "short_swap",
      },
      {
        label: "Stop level",
        unit: "pips",
        key: "stop_level",
      },
    ],
  };

  const items = [
    {
      label: "0.9",
      key: "avg_spread",
    },
    {
      label: "$0",
      key: "commission",
    },
    {
      label: "0.9%",
      key: "margin",
    },
    {
      label: "-0.9",
      key: "long_swap",
    },
    {
      label: "-0.9",
      key: "short_swap",
    },
    {
      label: "0",
      key: "stop_level",
    },
  ];

  const tableRows: TableRowProps[] = [
    {
      label: {
        title: "BTCUSD",
      },
      items,
    },
    {
      label: {
        title: "ETHUSD",
      },
      items,
    },
    {
      label: {
        title: "SOLUSD",
      },
      items,
    },
    {
      label: {
        title: "AVAXUSD",
      },
      items,
    },
    {
      label: {
        title: "LTCUSD",
      },
      items,
    },
  ];

  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <h3 className={styles.ttl}>
          Trade With <span>Real-time Quotes</span> & <span>Low Spreads</span>
        </h3>
        <SpreadTable
          tableClassName={styles.table}
          header={tableHeader}
          rows={tableRows}
        />
      </Section>
    </>
  );
};

export { Spreads };
