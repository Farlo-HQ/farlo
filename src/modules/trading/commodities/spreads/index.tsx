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
        title: "AMZN",
        sub_title: "Amazon.com, Inc.",
      },
      items,
    },
    {
      label: {
        title: "NFLX",
        sub_title: "Netflix, Inc.",
      },
      items,
    },
    {
      label: {
        title: "NVDA",
        sub_title: "NVIDIA Corporation",
      },
      items,
    },
    {
      label: {
        title: "MSFT",
        sub_title: "Microsoft Corporation",
      },
      items,
    },
    {
      label: {
        title: "BAC",
        sub_title: "Bank of America Corporation",
      },
      items,
    },
  ];

  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <h3 className={styles.ttl}>
          Access The <span>Best</span> Spreads & Market Prices In Real Time
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
