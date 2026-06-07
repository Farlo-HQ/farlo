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
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight } from "@/assets/icons/arrow-right";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const GettingStarted = ({ greyBg }: { greyBg?: boolean }) => {
  const { isMobile } = useDeviceSize(900);
  const router = useRouter();

  const data = [
    {
      image: isMobile ? gettingStartedMobile1 : gettingStarted1,
      title: "Sign up and verify.",
      description:
        "Register in minutes. Confirm your identity once and unlock every asset class — FX, copy trading, and US equities.",
    },
    {
      image: isMobile ? gettingStartedMobile2 : gettingStarted2,
      title: "Fund your wallet.",
      description:
        "Deposit in your currency via Paystack, USDT, or bank transfer. Funds appear instantly. Minimum $100.",
    },
    {
      image: isMobile ? gettingStartedMobile3 : gettingStarted3,
      title: "Trade or invest.",
      description:
        "Choose Trading Mode for FX and CFDs, or Investing Mode for US equities. Switch between them anytime.",
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".step-2", { xPercent: 150, x: 0 });
      gsap.set(".step-3", { xPercent: 150, x: 0 });

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".steps-container",
          pin: true,
          pinSpacing: true,
          start: "top 100px",
          end: isMobile ? "+=1200px" : "+=1800",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.addLabel("step1");

      timeline.to(".step-2", {
        xPercent: 0,
        x: isMobile ? 0 : 60,
        ease: "power2.out",
        duration: 1,
      });
      timeline.addLabel("step2");

      timeline.to(
        ".step-3",
        {
          xPercent: 0,
          x: isMobile ? 0 : 120,
          ease: "power2.out",
          duration: 1,
        },
        "+=0.3"
      );
      timeline.addLabel("step3");

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
        <p>Up and trading in three steps.</p>
        <h3>Open your account in minutes.</h3>
      </div>
      <div className={styles.btnSec}>
        <Button
          // onClick={() => router.push(ROUTES.signup)}
          onClick={() => window.open("https://accounts.farlofx.com/auth/register", "_blank", "noopener,noreferrer")}
        >
          Get Started <ArrowRight />
        </Button>
      </div>
      <div className={styles.cards}>
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
                <Button
                  onClick={() => window.open("https://accounts.farlofx.com/auth/register", "_blank", "noopener,noreferrer")}
                >
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
