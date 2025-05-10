import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { aboutUs1, aboutUs2, aboutUs3 } from "@/assets/images";

const WhoWeAre = () => {
  return (
    <>
      <Section sectionClassName={styles.section}>
        <div className={styles.header} >
          <p className={styles.header__tag} >Who we are?</p>
          <h2 className={styles.header__ttl} >A Broker Built for traders and backed by experts</h2>
          <p className={styles.header__txt} >What sets us apart?</p>
        </div>
        <div className={styles.content} >
          <Image src={aboutUs1} alt="" width={657} height={433} />
          <div className={styles.content__sec} >
            <p className={styles.content__ttl}>Client-Centric Approach</p>
            <p className={styles.content__txt}>
              We prioritize localization, tailoring our services to meet the
              unique needs of traders across Africa.
            </p>
          </div>
        </div>
        <div className={`${styles.content} ${styles["content--reverse"]}`} >
          <Image src={aboutUs2} alt="" width={657} height={433} />
          <div className={styles.content__sec} >
            <p className={styles.content__ttl}>Best in class trading conditions</p>
            <p className={styles.content__txt}>
            Enjoy ultra-low spreads, deep liquidity, and institutional-grade execution.
            </p>
          </div>
        </div>
        <div className={styles.content} >
          <Image src={aboutUs3} alt="" width={657} height={433} />
          <div className={styles.content__sec} >
            <p className={styles.content__ttl}>Innovation & Security</p>
            <p className={styles.content__txt}>
            Cutting-edge technology backed by the highest security standards.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export { WhoWeAre };
