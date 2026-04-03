import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { core_values, mission, vision } from "@/assets/images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Our Mission",
    description: ` To provide transparent, reliable, and innovative trading platform
              that caters to African traders' unique needs, while expanding
              globally with scalable and sustainable growth.`,
    className: styles.mission,
    image: mission,
  },
  {
    title: "Our Vision",
    description: `To be the most trusted and accessible forex broker in Africa,
              delivering world-class trading solutions that empower traders at
              all levels.`,
    className: styles.vision,
    image: vision,
  },
  {
    title: "Our Core Values",
    description: "At the heart of everything we do are our core values:",
    className: styles.core_values,
    image: core_values,
    content: (
      <>
        <div className={styles.core_values__items}>
          <p>
            <span>Trust:</span> Transparency and integrity guide every aspect of
            our business.
          </p>
          <p>
            <span>Performance:</span> We are committed to providing fast,
            efficient, and reliable trading solutions.
          </p>
          <p>
            <span>Precision:</span> With every tool, every trade, and every
            decision, we focus on accuracy and excellence.
          </p>
        </div>
      </>
    ),
  },
];

const Mission = () => {
  const { isMobile } = useDeviceSize(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card-item");

      if (cards.length === 0) return;

      // Initial card positioning
      gsap.set(cards[0], {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      });

      gsap.set(cards[1], {
        position: "absolute",
        top: 600,
        left: 0,
        zIndex: 1,
      });

      gsap.set(cards[2], {
        position: "absolute",
        top: 1200,
        left: 0,
        zIndex: 2,
      });

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: container,
          pinSpacing: true,
          start: "top top",
          end: "+=2500",
          scrub: 0.5,
          anticipatePin: 1,
          markers: true,
        },
      });

      // Add pause at start
      tl.to({}, { duration: 0.5 });

      // Slide card 2 up
      tl.to(
        cards[1],
        {
          top: 48,
          ease: "none",
          duration: 2,
        },
        0.5
      );

      // Slide card 3 up
      tl.to(
        cards[2],
        {
          top: 96,
          ease: "none",
          duration: 2,
        },
        1.5
      );

      // Add hold at the end to prevent jump on unpin
      tl.to({}, { duration: 1 });
    }, container);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      <Section
        bgClassName={styles.bg}
        sectionClassName={`section ${styles.section}`}
        ref={containerRef}
      >
        <div className={styles.cards_container}>
          {cards.map((item, index) => (
            <div key={index} className={`card-item ${styles.content} ${item.className}`}>
              <div>
                <p className={styles.content__ttl}>{item.title}</p>
                <p className={styles.content__txt}>{item.description} </p>

                {item.content ? (
                  <div className={styles.core_values__items}>
                    {item.content}
                  </div>
                ) : null}
              </div>
              <Image src={item.image} width={497} height={547} alt="" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export { Mission };
