import styles from "./styles.module.scss";
import { Section } from "@/components";
import Image from "next/image";
import { buildings } from "@/assets/images";

const Buildings = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <Image
          style={{ width: "100%", height: "auto" }}
          src={buildings}
          alt="buildings"
          width={1464}
          height={682}
        />
      </Section>
    </>
  );
};

export { Buildings };
