import { Accordion, FAQData } from "./accordion";
import { Section } from "../section";
import styles from "./styles.module.scss";

const FAQS = () => {
  const faqs: FAQData[] = [
    {
      question: "Is Farlo FX regulated?",
      answer:
        "Farlo FX is a regulated broker, holding multiple regulatory licenses from several financial authorities across the globe such as the Seychelles Financial Services Authority (FSA), Cyprus Securities and Exchange Commission (CySEC)*, the Financial Conduct Authority (FCA) in the UK*, South Africa Financial Sector Conduct Authority (FSCA), Central Bank of Curacao and Sint Maarten (CBCS), Financial Services Commission (FSC) in the British Virgin Islands, Financial Services Commission (FSC) in Mauritius, Capital Markets Authority (CMA) in Kenya, and the Jordan Securities Commission (JSC).",
    },
    {
      question: "In which countries is Farlo FX regulated?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
    },
    {
      question:
        "What is the difference between a regulated broker and an unregulated broker",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
    },
    {
      question: "How can I create an Farlo account?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
    },
  ];
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <p className={styles.tag}>FAQs</p>
        <p className={styles.ttl}>Frequently asked questions</p>
      </div>
      <div>
        <Accordion data={faqs} />
      </div>
    </Section>
  );
};

export { FAQS };
