import { Section } from "@/components";
import styles from "./styles.module.scss";
import { LiveWebinars } from "@/assets/vectors/live-webinars";
import { BooksGuides } from "@/assets/vectors/books-guides";
import { TechResearch } from "@/assets/vectors/tech-research";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Link from "next/link";

const LearnTrade = () => {
  const data = [
    {
      title: "Live Webinars",
      text: "Stay updated with expert insights and real-time market analysis.",
      icon: <LiveWebinars />,
    },
    {
      title: "Technical and Fundamental Research",
      text: "Make informed decisions with top-tier data.",
      icon: <TechResearch />,
    },
    {
      title: "E-books and Guides",
      text: "Master market fundamentals and advanced trading techniques.",
      icon: <BooksGuides />,
    },
  ];
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.cards}>
        {data.map(({ icon, text, title }, index) => (
          <div className={styles.card} key={`learn-trade-${index}`}>
            {icon}
            <div>
              <p className={styles.card__ttl}>{title}</p>
              <p className={styles.card__txt}>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <p className={styles.content__ttl}>
          Learn, Trade, Succeed{" "}
          <span>with FarloFX</span>
        </p>
        <p className={styles.content__txt}>
          Our extensive suite of learning materials provides insights from
          industry professionals through:
        </p>
        <Link href={""}>
          Learn more <ArrowRight />
        </Link>
      </div>
    </Section>
  );
};
export { LearnTrade };
