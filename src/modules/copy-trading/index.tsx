"use client";

import { HeroSection2 } from "@/components/heroSection2";
import { Section } from "@/components";
import { Button } from "@/components/button";
import { BottomBanner } from "@/components/bottom-banner";
import { FAQS } from "@/components/faqs";
import { FAQData } from "@/components/faqs/accordion";
import { ArrowRight } from "@/assets/icons/arrow-right";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

const faqs: FAQData[] = [
  {
    question: "How does copy trading work on FARLO?",
    answer:
      "You browse the leaderboard, choose a strategy provider, and set the amount you want to allocate. When the provider opens a trade, yours opens proportionally. When they close, you close. No manual action required.",
  },
  {
    question: "Can I lose more than I allocate?",
    answer:
      "No. Your risk is capped to exactly the amount you allocate to each provider. You can set a maximum drawdown threshold that will automatically stop copying if hit.",
  },
  {
    question: "What data is shown before I follow a provider?",
    answer:
      "Maximum drawdown, verified return history (minimum 12 months required), win rate, average trade duration, and current copier count. All data is audited, not self-reported.",
  },
  {
    question: "Can I copy multiple providers?",
    answer:
      "Yes. You can allocate capital to multiple strategy providers simultaneously. Each allocation is independent with its own risk cap.",
  },
];

const steps = [
  {
    num: "01",
    title: "Browse the leaderboard.",
    body: "Filter by return, drawdown, win rate, or strategy type. Every provider has a verified track record, not a marketing promise.",
  },
  {
    num: "02",
    title: "Set your allocation.",
    body: "Choose how much capital to assign to each provider. Your risk is capped to exactly that amount.",
  },
  {
    num: "03",
    title: "Trades replicate automatically.",
    body: "When your provider opens a position, yours opens proportionally. When they close, you close.",
  },
];

const trustSignals = [
  "Maximum drawdown visible before you follow",
  "Minimum 12-month verified history required",
  "Copier count and average return shown upfront",
  "Set a drawdown limit — auto-stops if hit",
];

const CopyTradingUI = () => {
  const router = useRouter();
  return (
    <>
      <HeroSection2
        tag="COPY TRADING"
        title={
          <>
            Follow the best.<br /> Profit without the screen time.
          </>
        }
        text={
          "Copy the trades of verified strategy providers automatically. Set your allocation. Walk away. Check results when you are ready."
        }
        bgClassName={styles.heroBg}
        btn1={{ text: "Browse Strategy Providers", action: () => router.push(ROUTES.signup) }}
      />

      {/* How It Works */}
      <Section bgClassName={styles.howBg} sectionClassName={styles.howSection}>
        <div className={styles.howHeader}>
          <p className={styles.label}>HOW IT WORKS</p>
          <h2 className={styles.ttl}>Three steps. Then it runs itself.</h2>
        </div>
        <div className={styles.steps}>
          {steps.map(({ num, title, body }) => (
            <div key={num} className={styles.step}>
              <p className={styles.step__num}>{num}</p>
              <p className={styles.step__title}>{title}</p>
              <p className={styles.step__body}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bgClassName={styles.trustBg} sectionClassName={styles.trustSection}>
        <div className={styles.trustContent}>
          <div className={styles.trustText}>
            <p className={styles.label}>BEFORE YOU FOLLOW</p>
            <h2 className={styles.ttl}>
              Every number you need.<br /> Before you risk a dollar.
            </h2>
            <p className={styles.trustBody}>
              FARLO does not let providers market themselves. Every stat is audited. Every return is verified. The leaderboard shows what actually happened.
            </p>
            <Button onClick={() => router.push(ROUTES.signup)}>
              Browse Strategy Providers <ArrowRight />
            </Button>
          </div>
          <div className={styles.trustList}>
            {trustSignals.map((signal) => (
              <div key={signal} className={styles.trustItem}>
                <span className={styles.trustItem__check}>✓</span>
                <p className={styles.trustItem__text}>{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FAQS title="Frequently asked questions" />

      <BottomBanner
        title="Follow the best. Profit without the screen time."
        text="Browse verified strategy providers. Set your allocation. Walk away."
        fillBtn={{ text: "Browse Strategy Providers", action: () => router.push(ROUTES.signup) }}
        outlineBtn={{ text: "Open Demo", action: () => router.push(ROUTES.signup) }}
      />
    </>
  );
};

export { CopyTradingUI };
