
import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const Support = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <p className={styles.tag}>Still have Questions?</p>
        <p className={styles.ttl}>
          Reach out to our support team at{" "}
          <a href="mailto:support@farlofx.com" className={styles.email}>
            support@farlofx.com
          </a>{" "}
          or call us on{" "}
          <a href="tel:+17583052921" className={styles.email}>
            +1 (758) 305-2921
          </a>
        </p>
      </div>
      <div className={styles.btns}>
        <Button onClick={() => window.location.href = "mailto:support@farlofx.com"}>
          Send us an email <ArrowRight />
        </Button>
      </div>
    </Section>
  );
};

export { Support };