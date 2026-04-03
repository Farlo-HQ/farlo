import { Section } from "@/components";
import styles from "./styles.module.scss";
import { LockIcon } from "@/assets/icons/lock";
import { BookIcon } from "@/assets/icons/book";
import { VideoIcon } from "@/assets/icons/video";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

gsap.registerPlugin(ScrollTrigger);

const OurPromise = () => {
  const { isMobile } = useDeviceSize(800);
  const data = [
    {
      title: "Ebooks & guides",
      description:
        "Master market fundamentals and advanced trading techniques.",
      icon: <BookIcon />,
      className: styles.books,
    },
    {
      title: "Live webinars",
      description:
        "Stay updated with expert insights and real-time market analysis.",
      icon: <VideoIcon />,
      className: styles.webinar,
    },
    {
      title: "We priotize your security",
      description:
        "because your funds and data deserve the highest protection.",
      icon: <LockIcon />,
      className: styles.security,
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial states - cards start off-screen to the right
      gsap.set(".step-1", {
        xPercent: 150,
        opacity: 0,
      });

      gsap.set(".step-2", {
        xPercent: 150,
      });

      gsap.set(".step-3", {
        xPercent: 150,
      });

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".promise-container",
          pin: isMobile,
          start: "top 80%", // Start when section is 80% down viewport
          end: isMobile ? "+=500px" : "+=600px",
          scrub: 1,
        },
      });

      // Card 1 slides in
      timeline.to(".step-1", {
        xPercent: 0,
        opacity: 1,
        ease: "none",
        duration: 1,
      });

      // Card 2 slides in with overlap
      timeline.to(
        ".step-2",
        {
          xPercent: 0,
          ease: "none",
          duration: 1,
        },
        ">-0.75"
      );

      // Card 3 slides in with overlap
      timeline.to(
        ".step-3",
        {
          xPercent: 0,
          ease: "none",
          duration: 1,
        },
        ">-0.75"
      );
    });
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      <Section
        bgClassName={styles.bg}
        sectionClassName={`promise-container ${styles.section}`}
      >
        <div className={styles.content}>
          <p className={styles.content__tag}>Our promise to you</p>
          <h4 className={styles.content__ttl}>Your Success Is Our Success</h4>
          <p className={styles.content__txt}>
            We&apos;re redefining the trading experience by prioritizing
            innovation, education, and trader-first solutions.
          </p>
        </div>
        <div className={` `}>
          <div className={`${styles.cards}`}>
            {data.map((item, index) => (
              <div
                key={`promise-${index}`}
                className={`step-${index + 1} ${styles.card} ${item.className}`}
              >
                {item.icon}
                <p className={styles.card__txt1}>{item.title}</p>
                <p className={styles.card__txt2}>{item.description} </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export { OurPromise };
