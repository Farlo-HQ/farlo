import { Section } from "@/components";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { blog_img } from "@/assets/images";

const HeroSection = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <h1 className={styles.ttl}>Blog</h1>
        <div className={styles.card} >
          <div className={styles.card__content} >
            <p className={styles.card__date} >13 Sept., 2022.</p>
            <p className={styles.card__ttl}>
              Setting the standard with the best and most stable spreads on
              Farlo’s top assets
            </p>
            <p className={styles.card__txt} >
              The difference or gap between the Bid and Ask price is one of the
              most critical factors in trading.
            </p>
            <Link className={styles.card__link} href={"/"}>Read more</Link>
          </div>
          <Image  className={styles.card__img} src={blog_img} width={854} height={520} alt="" />
        </div>
      </Section>
    </>
  );
};

export { HeroSection };
