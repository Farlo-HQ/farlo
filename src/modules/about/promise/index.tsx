import { Section } from "@/components";
import styles from "./styles.module.scss";
import { LockIcon } from "@/assets/icons/lock";
import { BookIcon } from "@/assets/icons/book";
import { VideoIcon } from "@/assets/icons/video";

const OurPromise = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.content}>
          <p className={styles.content__tag}>Our promise to you</p>
          <h4 className={styles.content__ttl}>Your Success Is Our Success</h4>
          <p className={styles.content__txt}>
            We&apos;re redefining the trading experience by prioritizing
            innovation, education, and trader-first solutions.
          </p>
        </div>
        <div>
          <div className={`${styles.card} ${styles.books}`}>
            <BookIcon />
            <p className={styles.card__txt1}>Ebooks & guides</p>
            <p className={styles.card__txt2}>
              Master market fundamentals and advanced trading techniques.{" "}
            </p>
          </div>
          <div className={`${styles.card} ${styles.webinar}`}>
            <VideoIcon />
            <p className={styles.card__txt1}>Live webinars</p>
            <p className={styles.card__txt2}>
              Stay updated with expert insights and real-time market analysis.{" "}
            </p>
          </div>
          <div className={`${styles.card} ${styles.security}`}>
            <LockIcon />
            <p className={styles.card__txt1}>We priotize your security</p>
            <p className={styles.card__txt2}>
              because your funds and data deserve the highest protection.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export { OurPromise };
