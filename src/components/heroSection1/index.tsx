import { ReactNode } from "react";
import { Button } from "../button";
import { Section } from "../section";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";

interface HeroSection1Props {
  sectionClassName?: string;
  bgClassName?: string;
  tag?: string;
  title: string;
  text: string;
  element: ReactNode
}

const HeroSection1: React.FC<HeroSection1Props> = ({
  sectionClassName,
  bgClassName,
  title,
  text,
  tag,element
}) => {
  return (
    <>
      <Section
        bgClassName={`${styles.bg} ${bgClassName}`}
        sectionClassName={`container ${styles.section} ${sectionClassName}`}
      >
        <div className={styles.txtContent}>
          {tag ? <p className={styles.tag}>{tag}</p> : null}
          <h1 className={styles.ttl}>{title}</h1>
          <p className={styles.txt}>{text}</p>
          <Button variant="fill-red">
            Open Account <ArrowRight />
          </Button>
        </div>
        {element}
      </Section>
    </>
  );
};

export { HeroSection1 };
