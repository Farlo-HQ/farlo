import { ArrowRight } from "@/assets/icons/arrow-right";
import styles from "./styles.module.scss";

import { LegalHeroGrid } from "@/assets/vectors";
import { Button, Section } from "@/components";
import { ReactNode } from "react";

interface HeroSection3Props {
  sectionClassName?: string;
  bgClassName?: string;
  txtClassName?: string;
  tag?: string;
  title: string | ReactNode;
  text: string;
  element?: ReactNode;
  btn1?: { text: string; action: () => void };
  btn2?: { text: string; action: () => void };
  noElement?: boolean;
}

const HeroSection3: React.FC<HeroSection3Props> = (props) => {
  const {
    sectionClassName,
    bgClassName,
    title,
    text,
    tag,
    element,
    txtClassName,
    btn1,
    btn2,
    noElement,
  } = props;
  return (
    <>
      <Section bgClassName={`${styles.bg} ${noElement ? styles["bg--img"] : ""}`} sectionClassName={`${styles.section} ${sectionClassName || ""}`}>
        <div className={styles.txtContent}>
          {tag ? <p className={styles.tag}>{tag}</p> : null}
          <h1 className={styles.ttl}>{title}</h1>
          <p className={`${styles.txt} ${txtClassName}`}>{text}</p>
          <div className={styles.ctas}>
            {btn1 ? (
              <Button onClick={btn1.action} variant="fill-red">
                {btn1.text} <ArrowRight />
              </Button>
            ) : null}
            {btn2 ? (
              <Button onClick={btn2.action} variant="fill-white">
                {btn2.text} <ArrowRight />
              </Button>
            ) : null}
          </div>
        </div>
        {noElement ? null : <LegalHeroGrid className={styles.element} />}
      </Section>
    </>
  );
};

export { HeroSection3 };
