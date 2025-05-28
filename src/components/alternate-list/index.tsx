import { Section } from "@/components";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

interface Props {
  tag: string;
  title: string | ReactNode;
  text: string | ReactNode;
  list: { title: string; text: string }[];
  color: "light" | "dark";
}

const AlternateList = ({ tag, text, title, color, list }: Props) => {
  return (
    <Section
      bgClassName={`${styles.bg} ${styles[color]}`}
      sectionClassName={`${styles.section}`}
    >
      <div className={styles.sec1}>
        <p className={styles.tag}>{tag}</p>
        <h2 className={styles.ttl}>{title}</h2>
        <p className={styles.txt}>{text}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.cards}>
          {list.map(({ text, title }, index) => (
            <div key={`${tag.replaceAll(" ", "-")}-${index}`} className={styles.card}>
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { AlternateList };
