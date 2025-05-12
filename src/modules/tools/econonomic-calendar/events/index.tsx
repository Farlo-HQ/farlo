import { Section } from "@/components";
import styles from "./styles.module.scss";
import { Table, TableHeaderProps, TableRowProps } from "@/components/table";

const Events = () => {
  const tableHeader: TableHeaderProps = {
    title: "Time",
    items: [
      {
        label: "Symbol",
        key: "avg_spread",
      },
      {
        label: "Event",
        key: "event",
      },
    ],
    tableHeaderClassName: styles.tableHeader
  };

  const items = [
    {
      label: "AUD",
      key: "symbol",
    },
    {
      label: "Australia_Building Approvals",
      key: "event",
    },
  ];

  const tableRows: TableRowProps[] = [
    {
      label: {
        title: "00:30",
      },
      items,
    },
    {
      label: {
        title: "00:30",
      },
      items,
    },
    {
      label: {
        title: "00:30",
      },
      items,
    },
    {
      label: {
        title: "00:30",
      },
      items,
    },
    {
      label: {
        title: "00:30",
      },
      items,
    },
  ];

  const dataGroups = [
    {
      title: "06 March",
      rows: tableRows,
    },
    {
      title: "05 March",
      rows: tableRows,
    },
    {
      title: "04 March",
      rows: tableRows,
    },
  ];
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <Table
          tableClassName={styles.table}
          header={tableHeader}
          data_groups={dataGroups}
          tableRowClassName={styles.tableRow}
          dataGroupClassName={styles.dataGroup}
        />
      </Section>
    </>
  );
};

export { Events };
