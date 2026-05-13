import { Section } from "@/components";
import styles from "./styles.module.scss";

const Note = () => {
  return (
    <>
      <Section bgClassName={styles.bg} sectionClassName={styles.section}>
        <div className={styles.note}>
          <p className={styles.note__ttl}>A note from our CEO</p>
          <p className={styles.note__txt}>
            “As a team of finance professionals, we wanted to create a community
            and a product where novice and experienced traders can learn enough
            to earn, and trade with the best tools available right at their very
            disposal.”
          </p>
          <p className={styles.note__name}>John Sturridge</p>
          <p className={styles.note__role}>CEO and Cofounder Farlo</p>
        </div>
      </Section>
    </>
  );
};

export { Note };
