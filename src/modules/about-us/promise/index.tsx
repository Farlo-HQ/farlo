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
      // all your GSAP animation code here

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".promise-container",
          pin: isMobile,
          // pinSpacing: true,
          start: "top top",
          end: isMobile ?  "+=500px" :"+=600px",
          scrub: 1,
          // markers: true,
        },
        delay: 300,
      });

      timeline.addLabel("step1");
      timeline.to(".step-1", {
        opacity: 1,
        x: 0,
      });

      timeline.from(".step-2", {
        xPercent: 150,
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
          // xPercent: 0,
          x: 0,
        },
        ">-75%"
      );

      timeline.from(".step-3", {
        xPercent: 150,
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
          x: 0,
        },
        ">-75%"
      );
    });
    return () => ctx.revert(); // <- cleanup!
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
