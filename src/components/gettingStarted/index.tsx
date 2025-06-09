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
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight } from "@/assets/icons/arrow-right";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // all your GSAP animation code here

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".steps-container",
          pin: true,
          pinSpacing: true,
          start: "left left",
          end: isMobile ? "+=3000px" : "+=1500",
          scrub: 1,
          markers: true,
        },
        delay: 300,
      });

      timeline.addLabel("step1");
      timeline.to(".step-1", {
        opacity: 1,
        x: 0,
      });

      timeline.from(".step-2", {
        xPercent: 60,
      });
      timeline.addLabel("step2");

      // timeline.to(
      //   ".step-1",
      //   {
      //     // opacity: 1,
      //     // x: 0,
      //      scale: 0.95
      //   },
      //   "-=0.3"
      // );

      timeline.to(
        ".step-2",
        {
          xPercent: 0,
          x: isMobile ? 0 : 60,
        },
        "-=0.3"
      );

      timeline.from(".step-3", {
        xPercent: 60,
      });
      timeline.addLabel("step3");

      // timeline.to(
      //   ".step-2",
      //   {
      //     // xPercent: 0,
      //     // x: 96,
      //     scale: 0.98
      //   },
      //   "-=0.3"
      // );

      timeline.to(
        ".step-3",
        {
          x: isMobile ? 0 : 120,
        },
        "-=0.3"
      );
    });
    return () => ctx.revert(); // <- cleanup!
  }, [isMobile]);

  return (
    <Section
      bgClassName={greyBg ? styles.greyBg : styles.bg}
      sectionClassName={`${styles.section} steps-container`}
    >
      <div className={styles.header}>
        <p>What are you waiting for?</p>
        <h3 className="">Get started in three easy steps.</h3>
      </div>
      <div className={` ${styles.cards}`}>
        {data.map(({ title, image, description }, index) => (
          <div
            key={`step-${index}`}
            className={`step-${index + 1} ${styles.card}`}
          >
            {(index === 0 && isMobile) || index !== 0 ? (
              <p className={styles.card__count}>{index + 1}</p>
            ) : null}
            <Image src={image} alt={title} width={1122} height={502} />
            <div className={styles.card__content}>
              <div>
                <p className={styles.card__content__ttl}>{title}</p>
                <p className={styles.card__content__txt}>{description}</p>
              </div>
              {index === 0 && !isMobile ? (
                <Button>
                  Get Started <ArrowRight />
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
export { GettingStarted };
