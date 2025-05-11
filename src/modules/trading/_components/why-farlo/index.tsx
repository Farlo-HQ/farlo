import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface WhyFarloProps {
  tag: string;
  title: ReactNode;
  list: { title: string; text: string }[];
  image: StaticImageData;
}

const WhyFarlo = ({ title, list, image, tag }: WhyFarloProps) => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.header}>
        <p className={styles.header__tag}>{tag}</p>
        <h2 className={styles.header__ttl}>{title}</h2>
      </div>
      <div className={styles.content}>
        <Image src={image} alt="Coins" width={520} height={600} />
        <div className={styles.content__list}>
          {list.map(({ text, title }) => (
            <div key={title.replaceAll(" ", "_")} className={styles.item}>
              <p className={styles.item__ttl}>{title}</p>
              <p className={styles.item__txt}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { WhyFarlo };
