import { Section } from "@/components";
import styles from "./styles.module.scss";
import { Accordion } from "./accordion";

export interface LicenseData {
  title: string;
  description: string;
  link: string;
}

const Licenses = () => {
  const licenses: LicenseData[] = [
    {
      title: "Financial Services Authority (FSA)",
      description:
        "FSA is the autonomous regulatory body responsible to license, regulate, enforce regulatory and compliance requirements, monitor and supervise the conduct of business in the non-bank financial services sector in Seychelles.",
      link: "",
    },
    {
      title: "Central Bank of Curaçao and Sint Maarten (CBCS)",
      description: "",
      link: "",
    },
    {
      title: "Financial Services Commission (FSC)",
      description: "",
      link: "",
    },
    {
      title: "Financial Services Authority (FSA)",
      description: "",
      link: "",
    },
    {
      title: "Central Bank of Curaçao and Sint Maarten (CBCS)",
      description: "",
      link: "",
    },
  ];
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.header}>
          <h2>Licenses & Regulation</h2>
          <p>
            Our operations in various markets are licensed and regulated by
            global governing bodies, enabling us to deliver the best services to
            all our customers.
          </p>
        </div>
        <div>
          <Accordion data={licenses} />
        </div>
      </Section>
    </>
  );
};
export { Licenses };
