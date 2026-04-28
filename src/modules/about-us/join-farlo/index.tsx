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
        <h5 className={styles.content__ttl}>Build Your Future With FarloFX</h5>
        <p className={styles.content__txt}>
          Passionate about fintech and financial markets? Join us!
        </p>
        <Button variant={"ghost-red"}>
          Apply Now <ArrowRight />
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
