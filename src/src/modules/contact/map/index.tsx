import { Section } from "@/components";
import styles from "./styles.module.scss";

const AddressMap = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <section className={styles.container}>
          <div
            style={{ background: "grey", width: "100%", height: "500px" }}
          ></div>
        </section>
      </Section>
    </>
  );
};

export { AddressMap };
