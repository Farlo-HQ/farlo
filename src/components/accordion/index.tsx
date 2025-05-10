import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { FaqProps } from "modules/home/faq";

interface AccordionProps {
  faqs: FaqProps[];
}

const Accordion = ({ faqs }: AccordionProps) => {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  const handleOpen: (num: number | null) => void = (num) => {
    setCurOpen(num);
  };
  return (
    <div className={styles.accordion}>
      {faqs.map((item: FaqProps, i: number) => (
        <AccordionItem key={i} curOpen={curOpen} onOpen={handleOpen} num={i} {...item}>
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
};

interface AccordionItems {
  num: number;
  children: ReactNode;
  question: string;
  curOpen: number | null;
  onOpen: (num: number | null) => void;
}

const AccordionItem = ({ num, question, curOpen, onOpen, children }: AccordionItems) => {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div onClick={handleToggle}>
      <div className={`${styles.item} ${isOpen ? styles.openQuestion : ""}`}>
        <p className={styles.question}>{question}</p>
      </div>
      <div className={`${styles.answer} ${isOpen ? styles.open : ""}`}>{children}</div>
    </div>
  );
};

export { Accordion };
