import { Section } from "@/components";
import styles from "./styles.module.scss";
import { DocumentDownloadIcon } from "@/assets/icons/document-download";

const LegalDocuments = () => {
  const list = [
    {
      title: "Client Services Agreement",
      link: "",
    },
    {
      title: "Compliant Handling Policy",
      link: "",
    },
    {
      title: "Conflicts of Interest",
      link: "",
    },
    {
      title: "Privacy & Confidentliality Policy",
      link: "",
    },
    {
      title: "AML and Account Verification Policy",
      link: "",
    },
    {
      title: "Cost and Charges Policy",
      link: "",
    },
    {
      title: "Key Fact Statement",
      link: "",
    },
  ];
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.cards}>
        {list.map(({ title, link }, index) => (
          <div key={`why-farlo-${index}`} className={styles.card}>
            <DocumentDownloadIcon />
            <p className={styles.card__ttl}>{title}</p>
            <a href="link" target="blank" >View Document</a>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { LegalDocuments };
