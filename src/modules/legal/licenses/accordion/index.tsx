import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { LicenseData } from "..";
import { ArrowRight } from "@/assets/icons/arrow-right";

interface AccordionProps {
  data: LicenseData[];
}

const Accordion = ({ data }: AccordionProps) => {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  const handleOpen: (num: number | null) => void = (num) => {
    setCurOpen(num);
  };
  return data.map((item: LicenseData, i: number) => (
    <AccordionItem
      key={i}
      curOpen={curOpen}
      onOpen={handleOpen}
      num={i}
      {...item}
    >
      <div className={styles.accordion_body}>
        <p className={styles.description}>{item.description}</p>
        <a className={styles.link} href={item.link} target="blank" >
          LEARN MORE <ArrowRight />
        </a>
      </div>
    </AccordionItem>
  ));
};

interface AccordionItems {
  num: number;
  children: ReactNode;
  title: string;
  curOpen: number | null;
  onOpen: (num: number | null) => void;
}

const AccordionItem = ({
  num,
  title,
  curOpen,
  onOpen,
  children,
}: AccordionItems) => {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={styles.accordion} onClick={handleToggle}>
      <div className={`${styles.header} ${isOpen ? styles.openQuestion : ""}`}>
        <p className={styles.question}>{title}</p>
      </div>
      <div className={`${styles.answer} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};

export { Accordion };
