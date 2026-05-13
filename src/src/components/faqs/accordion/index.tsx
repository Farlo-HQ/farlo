import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { MinusIcon } from "@/assets/icons/icon-minus";
import { PlusIcon } from "@/assets/icons/icon-plus";

export interface FAQData {
  question: string;
  answer: string;
}

interface AccordionProps {
  data: FAQData[];
}

const Accordion = ({ data }: AccordionProps) => {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  const handleOpen: (num: number | null) => void = (num) => {
    setCurOpen(num);
  };
  return data.map((item: FAQData, i: number) => (
    <AccordionItem
      key={i}
      curOpen={curOpen}
      onOpen={handleOpen}
      num={i}
      {...item}
    >
      <div className={styles.accordion_body}>{item.answer}</div>
    </AccordionItem>
  ));
};

interface AccordionItems {
  num: number;
  children: ReactNode;
  question: string;
  curOpen: number | null;
  onOpen: (num: number | null) => void;
}

const AccordionItem = ({
  num,
  question,
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
        <p className={styles.question}>{question}</p>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <div className={`${styles.answer} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};

export { Accordion };
