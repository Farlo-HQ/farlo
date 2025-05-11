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
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
      link: "",
    },
    {
      title: "Financial Services Commission (FSC)",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
      link: "",
    },
    {
      title: "Financial Services Authority (FSA)",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
      link: "",
    },
    {
      title: "Central Bank of Curaçao and Sint Maarten (CBCS)",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
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
