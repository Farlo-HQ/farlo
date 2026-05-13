"use client"

import { GettingStarted, HeroSection1, Rates } from "@/components";
import styles from "./styles.module.scss";
import { Gateway } from "./gateway";
import { Opportunity } from "./opportunity";
import { TradeAnywhere } from "./trade-anywhere";
import { WhyFarlo } from "./why-farlo";
import { CompletePackage } from "./completePackage";
import CoinsAnimation from "@/assets/animations/coins3.json";
import { LearnTrade } from "./learn-trade";
import { GetHelp } from "./get-help";
import { BottomBanner } from "@/components/bottom-banner";
import { Problem } from "./problem";
import { DualMode } from "./dual-mode";
import { StatsStrip } from "./stats-strip";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const HomeUI = () => {
  return (
    <>
      <HeroSection1
        title="Trade Smarter. Invest Further. All In One Place."
        text={`FX, copy trading, and US equities under one account. Fund in your local currency. Switch between trading and investing in seconds.`}
        tag="ONE ACCOUNT   |   EVERY MARKET   |   BUILT FOR EMERGING MARKETS"
        label="No card required. Verified in under 5 minutes."
        bgClassName={styles.bg}
        sectionClassName={styles.section}
        element={
          <>
            <div className={styles.overlay}></div>
            <Lottie
              className={styles.animation_wrapper}
              animationData={CoinsAnimation}
              loop={true}
            />
          </>
        }
      />

      {/* ── ORIGINAL: Rates ticker ── */}
      <Rates />

      {/* ── IMPROVED: Gateway (350+ instruments) ── */}
      <Gateway />

      {/* ── NEW: Problem section ── */}
      <Problem />

      {/* ── NEW: Dual mode ── */}
      <DualMode />

      {/* ── ORIGINAL: Getting started carousel ── */}
      <GettingStarted />

      {/* ── ORIGINAL: Opportunity ── */}
      <Opportunity />

      {/* ── ORIGINAL: Trade anywhere / platforms ── */}
      <TradeAnywhere />

      {/* ── ORIGINAL: Why FARLO ── */}
      <WhyFarlo />

      {/* ── NEW: Stats strip ── */}
      <StatsStrip />

      {/* ── ORIGINAL: Complete package CTA ── */}
      <CompletePackage />

      {/* ── ORIGINAL: Learn & trade ── */}
      <LearnTrade />

      {/* ── ORIGINAL: Get help ── */}
      <GetHelp />

      {/* ── ORIGINAL: Bottom banner ── */}
      <BottomBanner />
    </>
  );
};

export { HomeUI };
