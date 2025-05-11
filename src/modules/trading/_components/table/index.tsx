import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { MinusIcon } from "@/assets/icons/icon-minus";
import { PlusIcon } from "@/assets/icons/icon-plus";

export interface SpreadTableProps {
  header: TableHeaderProps;
  data_groups?: {
    title: string;
    rows: TableRowProps[];
  }[];
  rows?: TableRowProps[];
  tableClassName?: string;
}

const SpreadTable = ({
  header,
  data_groups,
  tableClassName,
  rows,
}: SpreadTableProps) => {
  return (
    <>
      <section className={`${styles.table} ${tableClassName || ""}`}>
        <TableHeader {...header} grey={!!rows && !data_groups} />
        {data_groups?.map((group, index) => (
          <DataGroup key={`group-${index}`} title={group.title}>
            {group.rows.map((row, rowIndex) => (
              <TableRow key={`group-${index}-row-${rowIndex}`} {...row} />
            ))}
          </DataGroup>
        ))}
        {rows?.map((row, rowIndex) => (
          <TableRow key={`row-${rowIndex}`} {...row} />
        ))}
      </section>
    </>
  );
};

export interface TableHeaderProps {
  title: string;
  items: { label: string; key: string; unit: string; sup?: string }[];
  grey?: boolean;
}

const TableHeader = ({ title, items, grey }: TableHeaderProps) => {
  return (
    <>
      <div className={`${styles.header} ${grey ? styles["header--grey"] : ""}`}>
        <p className={styles.header__ttl}>{title}</p>
        {items.map(({ label, key, unit, sup }) => (
          <div key={`header-${key}`} className={styles.header__item}>
            <p className={styles.header__item__label}>
              {label}
              {sup ? <sup>{sup}</sup> : null}
            </p>
            <p className={styles.header__item__unit}>{unit}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export interface TableRowProps {
  label: {
    title: string;
    sub_title?: string;
    tag?: string;
  };
  items: { label: string; key: string }[];
}
const TableRow = ({ label, items }: TableRowProps) => {
  return (
    <>
      <div className={`${styles.row}`}>
        <div className={styles.row__label}>
          <p className={styles.row__ttl}>{label.title}</p>
          {label.sub_title ? (
            <p className={styles.row__txt1}>{label.sub_title}</p>
          ) : null}
          {label.tag ? <p className={styles.row__txt2}>{label.tag}</p> : null}
        </div>
        {items.map(({ label, key }) => (
          <div key={`row-${key}`} className={styles.row__item}>
            {/* {items.find((item) => item.key === key)?.label} */}
            {label}
          </div>
        ))}
      </div>
    </>
  );
};

const DataGroup = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={styles.data_group}>
        <div
          role="accordion"
          onClick={() => setShow((prev) => !prev)}
          className={styles.data_group__header}
        >
          <p>{title}</p>
          {show ? <MinusIcon /> : <PlusIcon />}
        </div>
        {show ? children : null}
      </div>
    </>
  );
};

export { SpreadTable };
