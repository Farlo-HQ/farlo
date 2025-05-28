import styles from "./styles.module.scss";

import { LegalHeroGrid } from "@/assets/vectors";
import { Section } from "@/components";

interface HeroSection4Props {
  tag?: string;
  title: string;
  text: string;
}

const HeroSection4 = ({ text, title, tag }: HeroSection4Props) => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.txtContent}>
          {tag ? <p className={styles.tag}>{tag}</p> : null}
          <h1 className={styles.ttl}>{title}</h1>
          <p className={styles.txt}>{text}</p>
        </div>
        <LegalHeroGrid className={styles.element} />
      </Section>
    </>
  );
};

export { HeroSection4 };
