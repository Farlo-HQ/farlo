"use client"


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
      // Set initial states - cards 2 and 3 start off-screen to the right
      gsap.set(".step-2", {
        xPercent: 150,
        x: 0,
      });

      gsap.set(".step-3", {
        xPercent: 150,
        x: 0,
      });

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".steps-container",
          pin: true,
          pinSpacing: true,
          start: "top 100px",
          end: isMobile ? "+=1200px" : "+=1800",
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Step 1 is already visible, no animation needed for it initially
      timeline.addLabel("step1");

      // Step 2 slides in from right
      timeline.to(".step-2", {
        xPercent: 0,
        x: isMobile ? 0 : 60,
        ease: "none",
        duration: 1,
      });
      timeline.addLabel("step2");

      // Step 3 slides in from right
      timeline.to(
        ".step-3",
        {
          xPercent: 0,
          x: isMobile ? 0 : 120,
          ease: "none",
          duration: 1,
        },
        "+=0.3"
      );
      timeline.addLabel("step3");

      // Add a small hold at the end to prevent jump on unpin
      timeline.to({}, { duration: 0.5 });
    });
    return () => ctx.revert();
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
      <div className={styles.btnSec}>
        <Button>
          Get Started <ArrowRight />
        </Button>
      </div>
      <div className={`${styles.cards}`}>
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
