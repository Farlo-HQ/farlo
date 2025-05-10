import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { core_values, mission, vision } from "@/assets/images";

const Mission = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={`${styles.content} ${styles.mission}`}>
          <div>
            <p className={styles.content__ttl}>Our Mission</p>
            <p className={styles.content__txt}>
              To provide transparent, reliable, and innovative trading platform
              that caters to African traders' unique needs, while expanding
              globally with scalable and sustainable growth.
            </p>
          </div>
          <Image src={mission} width={497} height={547} alt="" />
        </div>
        <div className={`${styles.content} ${styles.vision}`}>
          <div>
            <p className={styles.content__ttl}>Our Vision</p>
            <p className={styles.content__txt}>
              To be the most trusted and accessible forex broker in Africa,
              delivering world-class trading solutions that empower traders at
              all levels.
            </p>
          </div>
          <Image src={vision} width={497} height={547} alt="" />
        </div>
        <div className={`${styles.content} ${styles.core_values}`}>
          <div>
            <p className={styles.content__ttl}>Our Core Values</p>
            <p className={styles.content__txt}>
              At the heart of everything we do are our core values:
            </p>

            <div className={styles.core_values__items}>
              <p>
                <span>Trust:</span> Transparency and integrity guide every
                aspect of our business.
              </p>
              <p>
                <span>Performance:</span> We are committed to providing fast,
                efficient, and reliable trading solutions.
              </p>
              <p>
                <span>Precision:</span> With every tool, every trade, and every
                decision, we focus on accuracy and excellence.
              </p>
            </div>
          </div>
          <Image src={core_values} width={497} height={547} alt="" />
        </div>
      </Section>
    </>
  );
};

export { Mission };
