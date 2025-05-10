import styles from "./styles.module.scss";

import { LegalHeroGrid } from "@/assets/vectors";
import { Section } from "@/components";

const HeroSection = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.txtContent}>
          <p className={styles.tag}>Legal</p>
          <h1 className={styles.ttl}>Our Legal Documents</h1>
          <p className={styles.txt}>
            Here is all you need to know about our terms and conditions, our
            legal structures, and our licenses.
          </p>
        </div>
        <LegalHeroGrid className={styles.element} />
      </Section>
    </>
  );
};

export { HeroSection };
