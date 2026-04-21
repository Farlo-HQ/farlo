import { Accordion, FAQData } from "./accordion";
import { Section } from "../section";
import styles from "./styles.module.scss";

const faqs: FAQData[] = [
  {
    question: "How do I deposit funds?",
    answer:
      "Via Paystack, USDT, card, or bank wire from your account dashboard. Minimum: $100",
  },
  {
    question: "How long does verification take",
    answer:
      "Under 5 minutes in most cases via Sumsub.",
  },
  {
    question: "Can I use FARLO in my country?",
    answer:
      "FARLO is available across Africa and most emerging markets. A full country list is available in the legal section.",
  },
  {
    question: "What is the difference between Trading Mode and Investing Mode?",
    answer:
      "Trading Mode is for FX, CFDs, and copy trading. Investing Mode is for real US stocks and ETFs. Both run on the same account.",
  },
  {
    question: "How do I switch between modes?",
    answer:
      "From your dashboard in two clicks. Your wallet balance is shared across both.",
  },
];

interface FAQSProps {
  title: string;
  // faqs?: FAQData[];
}

const FAQS = ({ title }: FAQSProps) => {
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
