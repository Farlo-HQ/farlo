import { Accordion, FAQData } from "./accordion";
import { Section } from "../section";
import styles from "./styles.module.scss";

interface FAQSProps {
  title: string;
  faqs: FAQData[];
}

const FAQS = ({ faqs, title }: FAQSProps) => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <p className={styles.tag}>FAQs</p>
        <p className={styles.ttl}>{title}</p>
      </div>
      <div>
        <Accordion data={faqs} />
      </div>
    </Section>
  );
};

export { FAQS };
