import { Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { core_values, mission, vision } from "@/assets/images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

  useLayoutEffect(() => {
    if (isMobile) return;
    let ctx = gsap.context(() => {
      // all your GSAP animation code here

      gsap.set(".card-item", { position: "absolute", left: 0, opacity: 1 });

      gsap.to(".card-item", {
        ease: "linear",
        yPercent: -100,
        stagger: 1,
        scrollTrigger: {
          trigger: ".cards-container",
          markers: false,
          start: "top 90%",
          end: "+=700px",
          scrub: 0.3,
          pin: true,
          invalidateOnRefresh: true,
          
        },
      });
    });
    return () => ctx.revert(); // <- cleanup!
  }, [isMobile]);



  return (
    <>
      <Section
        bgClassName={styles.bg}
        sectionClassName={`section ${styles.section} `}
      >
        <div className="cards-container">
          {cards.map((item) => (
            <div className={`card-item ${styles.content} ${item.className}`}>
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
        {/* <div className={`${styles.content} ${styles.mission}`}>
          <div>
            <p className={styles.content__ttl}>Our Mission</p>
            <p className={styles.content__txt}>
              To provide transparent, reliable, and innovative trading platform
              that caters to African traders' unique needs, while expanding
              globally with scalable and sustainable growth.
            </p>
          </div>
          <Image src={mission} width={497} height={547} alt="" />
        </div>
        <div className={`${styles.content} ${styles.vision}`}>
          <div>
            <p className={styles.content__ttl}>Our Vision</p>
            <p className={styles.content__txt}>
              To be the most trusted and accessible forex broker in Africa,
              delivering world-class trading solutions that empower traders at
              all levels.
            </p>
          </div>
          <Image src={vision} width={497} height={547} alt="" />
        </div>
        <div className={`${styles.content} ${styles.core_values}`}>
          <div>
            <p className={styles.content__ttl}>Our Core Values</p>
            <p className={styles.content__txt}>
              At the heart of everything we do are our core values:
            </p>

            <div className={styles.core_values__items}>
              <p>
                <span>Trust:</span> Transparency and integrity guide every
                aspect of our business.
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
          </div>
          <Image src={core_values} width={497} height={547} alt="" />
        </div> */}
      </Section>
    </>
  );
};

export { Mission };
