"use client";

import { HeroSection2 } from "@/components/heroSection2";
import { Section } from "@/components";
import { Button } from "@/components/button";
import { BottomBanner } from "@/components/bottom-banner";
import { ArrowRight } from "@/assets/icons/arrow-right";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

const tracks = [
  {
    label: "TRACK 1",
    title: "Starting Out",
    courses: [
      { name: "Introduction to Forex Trading", lessons: 12 },
      { name: "How to Read a Chart", lessons: 8 },
      { name: "Understanding Leverage and Risk", lessons: 6 },
    ],
  },
  {
    label: "TRACK 2",
    title: "Building Skills",
    courses: [
      { name: "Technical Analysis Fundamentals", lessons: 14 },
      { name: "Copy Trading Deep Dive", lessons: 6 },
      { name: "Position Sizing and Portfolio Management", lessons: 8 },
    ],
  },
  {
    label: "TRACK 3",
    title: "Advanced",
    courses: [
      { name: "Options Trading Basics", lessons: 16 },
      { name: "Building a US Equity Portfolio from Africa", lessons: 10 },
      { name: "Advanced FX Strategies", lessons: 12 },
    ],
  },
];

const resources = [
  {
    icon: "📅",
    label: "LIVE WEBINARS",
    title: "Monthly sessions with market analysts.",
    body: "Recorded and available after. Calendar updated at the start of each month.",
  },
  {
    icon: "📊",
    label: "RESEARCH AND ANALYSIS",
    title: "Weekly market outlook.",
    body: "Economic calendar with impact ratings. Technical levels updated daily on major pairs.",
  },
];

const EducationUI = () => {
  const router = useRouter();
  return (
    <>
      <HeroSection2
        tag="EDUCATION"
        title={
          <>
            Learn. Then trade<br /> with confidence.
          </>
        }
        text={
          "Every piece of content in this section was written for traders who are serious about getting better. No fluff. No generic advice. Real skills."
        }
        bgClassName={styles.heroBg}
        btn1={{ text: "Start Learning", action: () => router.push(ROUTES.signup) }}
      />

      {/* Learning Tracks */}
      <Section bgClassName={styles.tracksBg} sectionClassName={styles.tracksSection}>
        <div className={styles.tracksHeader}>
          <p className={styles.label}>STRUCTURED LEARNING</p>
          <h2 className={styles.ttl}>Three tracks. One clear path forward.</h2>
          <p className={styles.tracksSubtitle}>
            Know where to start. Know where to go next. Each track builds on the last.
          </p>
        </div>
        <div className={styles.tracks}>
          {tracks.map(({ label, title, courses }) => (
            <div key={label} className={styles.track}>
              <div className={styles.track__header}>
                <p className={styles.track__label}>{label}</p>
                <p className={styles.track__title}>{title}</p>
              </div>
              <div className={styles.track__courses}>
                {courses.map(({ name, lessons }) => (
                  <div key={name} className={styles.course}>
                    <p className={styles.course__name}>{name}</p>
                    <span className={styles.course__lessons}>{lessons} lessons</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost-red" onClick={() => router.push(ROUTES.signup)}>
                Start Track <ArrowRight />
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Webinars + Research */}
      <Section bgClassName={styles.resourcesBg} sectionClassName={styles.resourcesSection}>
        <div className={styles.resourcesHeader}>
          <p className={styles.label}>BEYOND THE COURSES</p>
          <h2 className={styles.ttlLight}>Stay sharp. Stay current.</h2>
        </div>
        <div className={styles.resources}>
          {resources.map(({ icon, label, title, body }) => (
            <div key={label} className={styles.resource}>
              <span className={styles.resource__icon}>{icon}</span>
              <p className={styles.resource__label}>{label}</p>
              <p className={styles.resource__title}>{title}</p>
              <p className={styles.resource__body}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <BottomBanner
        title="Learn. Then trade with confidence."
        text="Start with Track 1 or jump to the level that matches where you are right now."
        fillBtn={{ text: "Start Learning", action: () => router.push(ROUTES.signup) }}
        outlineBtn={{ text: "Open Demo Account", action: () => router.push(ROUTES.signup) }}
      />
    </>
  );
};

export { EducationUI };
