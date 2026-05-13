import { Section } from "@/components";
import styles from "./styles.module.scss";
import { TabData, Tabs } from "@/components/tabs";
import { useState } from "react";
import {
  Table,
  TableHeaderProps,
  TableRowProps,
} from "@/components/table";

const Spreads = () => {
  const [tab, setTab] = useState("Standard");

  const tabs: TabData[] = [
    {
      title: "Standard",
    },
    {
      title: "Pro",
    },
    {
      title: "Raw Spread",
    },
  ];

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
        title: "AUDUSDm",
        sub_title: "Australian Dollar vs US Dollar",
        tag: "Swap-free available",
      },
      items,
    },
    {
      label: {
        title: "DXYm",
        sub_title: "US Dollar Index",
      },
      items,
    },
    {
      label: {
        title: "EURUSDm",
        sub_title: "Euro vs US Dollar",
        tag: "Swap-free available",
      },
      items,
    },
    {
      label: {
        title: "GBPUSDm",
        sub_title: "Great Britain Pound vs US Dollar",
        tag: "Swap-free available",
      },
      items,
    },
    {
      label: {
        title: "NZDUSDm",
        sub_title: "New Zealand Dollar vs US Dollar",
        tag: "Swap-free available",
      },
      items,
    },
    {
      label: {
        title: "USDCADm",
        sub_title: "US Dollar vs Canadian Dollar",
        tag: "Swap-free available",
      },
      items,
    },
  ];

  const dataGroups = [
    {
      title: "Majors",
      rows: tableRows,
    },
    {
      title: "Minors",
      rows: tableRows,
    },
    {
      title: "Exotics",
      rows: tableRows,
    },
  ];
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <h3 className={styles.ttl}>
          Stay profitable with the best <span>spreads</span> and the best{" "}
          <span>swaps</span>
        </h3>
        <Tabs tabs={tabs} activeTab={tab} onClick={(tab) => setTab(tab)} />
        <Table
          tableClassName={styles.table}
          header={tableHeader}
          data_groups={dataGroups}
        />
      </Section>
    </>
  );
};

export { Spreads };
