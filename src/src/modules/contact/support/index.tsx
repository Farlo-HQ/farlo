import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

const Support = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <p className={styles.tag}>Still have Questions?</p>
        <p className={styles.ttl}>
          Reach out to our support team at
          <span>help@farlofx.com</span>
        </p>
      </div>
      <div className={styles.btns}>
        <Button>
          Start chat <ArrowRight />
        </Button>
      </div>
    </Section>
  );
};

export { Support };
