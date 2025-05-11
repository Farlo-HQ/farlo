import { ArrowRight } from "@/assets/icons/arrow-right";
import { ReactNode } from "react";
import { Button } from "../button";
import { Section } from "../section";
import styles from "./styles.module.scss";
import { TradingHeroGrid } from "@/assets/vectors/trading-hero-grid";
import { TradingHeroGridMobile } from "@/assets/vectors/trading-hero-grid-mobile";

interface HeroSection2Props {
  sectionClassName?: string;
  bgClassName?: string;
  txtClassName?: string;
  tag?: string;
  title: string | ReactNode;
  text: string;
  element?: ReactNode;
  btn1?: { text: string; action: () => void };
  btn2?: { text: string; action: () => void };
}

const HeroSection2: React.FC<HeroSection2Props> = (props) => {
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
  } = props;
  return (
    <>
      <Section
        bgClassName={`${styles.bg} ${bgClassName}`}
        sectionClassName={`container ${styles.section} ${sectionClassName}`}
      >
        <section className={styles.body}>
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
          {element}
        </section>
        <TradingHeroGrid className={`${styles.grid} ${styles["grid--desktop"]}`} />
        <TradingHeroGridMobile className={`${styles.grid} ${styles["grid--mobile"]}`}  />
      </Section>
    </>
  );
};

export { HeroSection2 };
