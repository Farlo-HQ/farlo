import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Image from "next/image";
import { join_us } from "@/assets/images";

const JoinFarlo = () => {
  return (
    <Section
      id="careers"
      bgClassName={styles.bg}
      sectionClassName={styles.section}
    >
      <div className={styles.content}>
        <h5 className={styles.content__ttl}>We are building the team.</h5>
        <p className={styles.content__txt}>
          If you want to build financial infrastructure for the most underserved markets in the world, we want to hear from you.
        </p>
        <Button variant={"ghost-red"}>
          See Open Roles <ArrowRight />
        </Button>
      </div>
      <Image
        src={join_us}
        width={580}
        height={490}
        alt="people working in an office"
      />
    </Section>
  );
};

export { JoinFarlo };
