import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { ArrowRight } from "@/assets/icons/arrow-right";

interface Props {
  tag?: string;
  title: string | ReactNode;
  text: string | ReactNode;
  list: { title: string; text: string }[];
  color: "light" | "dark";
  btn?: {
    text: string;
    action: () => void;
  };
}

const AlternateList = ({ tag, text, title, color, list, btn }: Props) => {
  return (
    <Section
      bgClassName={`${styles.bg} ${styles[color]}`}
      sectionClassName={`${styles.section}`}
    >
      <div className={styles.sec1}>
        {tag ? <p className={styles.tag}>{tag}</p> : null}
        <h2 className={styles.ttl}>{title}</h2>
        <p className={styles.txt}>{text}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.cards}>
          {list.map(({ text, title }, index) => (
            <div
              key={`${(tag || title).replaceAll(" ", "-")}-${index}`}
              className={styles.card}
            >
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          ))}
        </div>
      </div>
      {btn ? (
        <Button className={styles.btn} onClick={btn.action} variant="fill-red">
          {btn.text}
          <ArrowRight />
        </Button>
      ) : null}
    </Section>
  );
};

export { AlternateList };
