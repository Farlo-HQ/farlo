import { Section } from "../section";
import styles from "./styles.module.scss";
import { Button } from "../button";
import Image from "next/image";
import {
  gettingStarted1,
  gettingStarted2,
  gettingStarted3,
  gettingStartedMobile1,
  gettingStartedMobile2,
  gettingStartedMobile3,
} from "@/assets/images";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const GettingStarted = ({ greyBg }: { greyBg?: boolean }) => {
  const { isMobile } = useDeviceSize(900);

  const data = [
    {
      image: isMobile ? gettingStartedMobile1 : gettingStarted1,
      title: "Sign up and verify",
      description:
        "Register in minutes and confirm your identity for a secure trading experience.",
    },
    {
      image: isMobile ? gettingStartedMobile2 : gettingStarted2,
      title: "Open your trading account",
      description:
        "Select an account type tailored to your trading goals and fund it instantly.",
    },
    {
      image: isMobile ? gettingStartedMobile3 : gettingStarted3,
      title: "Download & Trade",
      description:
        "Access our MT5-powered platform from any device and start making informed trades.",
    },
  ];
  return (
    <Section
      bgClassName={greyBg ? styles.greyBg : ""}
      sectionClassName={styles.section}
    >
      <div className={styles.header}>
        <p>What are you waiting for?</p>
        <h3 className="">Get started in three easy steps.</h3>
      </div>
      <div className={styles.cards} >
        {data.map(({ title, image, description }, index) => (
          <div key={`step-${index}`} className={styles.card}>
            <Image src={image} alt={title} width={1122} height={502} />
            <div className={styles.card__content}>
              <p className={styles.card__content__ttl}>{title}</p>
              <p className={styles.card__content__txt}>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
export { GettingStarted };
