import { HeroSection1 } from "@/components";
import styles from "./styles.module.scss";

const HomeUI = () => {
  return (
    <>
      <HeroSection1 bgClassName={styles.bg} />
    </>
  );
};

export { HomeUI };
