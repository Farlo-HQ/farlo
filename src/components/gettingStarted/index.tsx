import { Section } from "../section";
import styles from "./styles.module.scss";
import { Button } from "../button";

const GettingStarted = ({ greyBg }: { greyBg?: boolean }) => {
  return (
    <Section
      bgClassName={greyBg ? styles.greyBg : ""}
      sectionClassName={styles.section}
    >
      <div className={styles.header}>
        <p>What are you waiting for?</p>
        <h3 className="">Get started in three easy steps.</h3>
      </div>
      <div style={{ background: "grey", width: "100%", height: "500px" }}></div>
    </Section>
  );
};
export { GettingStarted };
