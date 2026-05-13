"use client";

import { useState } from "react";
import { Section } from "@/components";
import { Button } from "@/components/button";
import { ArrowRight } from "@/assets/icons/arrow-right";
import { BottomBanner } from "@/components/bottom-banner";
import { GettingStarted } from "@/components";
import Image from "next/image";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import {
  mt5_desktop,
  mt5_desktop_mobile,
  mt5_mobile,
  market_analysis,
  tight_spread,
  advanced_trading,
  one_to_1000,
  economic_calendar,
  one_tap,
  live_alert,
  multi_device,
  low_latency,
  universal_compatibility,
  professional,
  account,
} from "@/assets/images";
import styles from "./styles.module.scss";
import { AppStore, PlayStore2 } from "@/assets/vectors";

/* ─── Data ──────────────────────────────────────────────────────────── */

const tabs = ["MT5 Desktop", "MT5 Mobile", "MT5 Web"] as const;
type Tab = (typeof tabs)[number];

const desktopFeatures = [
  {
    img: market_analysis,
    title: "Comprehensive Market Analysis",
    text: "Access 38 built-in indicators, 22 analytical tools, and 46 graphical objects for precision trading.",
  },
  {
    img: tight_spread,
    title: "Integrated Copy Trading & Signals",
    text: "Follow top-performing traders and automatically mirror their strategies in real time.",
  },
  {
    img: advanced_trading,
    title: "Advanced Algorithmic Trading",
    text: "Develop custom indicators and trading robots with the built-in MetaEditor tool.",
  },
  {
    img: one_to_1000,
    title: "Hedging and Netting Support",
    text: "Open multiple positions on the same asset, including hedged positions, for greater risk management.",
  },
  {
    img: economic_calendar,
    title: "Economic Calendar & Fundamental Analysis",
    text: "Stay informed with real-time financial news updates directly within the platform.",
  },
];

const mobileFeatures = [
  {
    img: one_tap,
    title: "One-Tap Trading & Account Management",
    text: "Monitor your account, review trade history, and execute orders instantly.",
  },
  {
    img: tight_spread,
    title: "Comprehensive Order Types",
    text: "Access advanced order execution, including Buy Stop Limit and Sell Stop, for enhanced flexibility.",
  },
  {
    img: live_alert,
    title: "Live Market News & Alerts",
    text: "Stay informed with real-time financial news and price movement notifications.",
  },
  {
    img: multi_device,
    title: "Multi-Device Synchronization",
    text: "Seamlessly switch between desktop, tablet, and mobile without losing progress.",
  },
];

const webFeatures = [
  {
    img: low_latency,
    title: "No Installation Required",
    text: "Trade instantly from any device, without downloading additional software.",
  },
  {
    img: universal_compatibility,
    title: "Universal Compatibility",
    text: "Works seamlessly on Windows, macOS, Linux, iOS, and Android.",
  },
  {
    img: professional,
    title: "Real-Time Market Access",
    text: "Execute trades in milliseconds with low-latency performance.",
  },
  {
    img: account,
    title: "Full Account Integration",
    text: "Supports all MT5 account types, ensuring a seamless trading experience.",
  },
];

const tabContent: Record<
  Tab,
  {
    headline: string;
    body: string;
    tag: string;
    ctaLabel: string;
    features: { img: any; title: string; text: string }[];
    featureHeading: string;
  }
> = {
  "MT5 Desktop": {
    tag: "Why MT5 Desktop",
    headline: "MT5 Desktop for serious sessions.",
    body: "Full charting suite. Custom indicators. Multi-chart layouts. For traders who want every tool on one screen. Included with every FARLO account.",
    ctaLabel: "Download MT5 for Desktop",
    features: desktopFeatures,
    featureHeading: "A multi-asset platform built for performance.",

  },
  "MT5 Mobile": {
    tag: "Why MT5 Mobile",
    headline: "MT5 Mobile for trading on the move.",
    body: "Live quotes, one-tap orders, and full account management on iOS and Android. Trading does not stop when you leave your desk.",
    ctaLabel: "Download MT5 for Desktop",
    features: mobileFeatures,
    featureHeading: "Trading does not stop when you leave your desk.",

  },
  "MT5 Web": {
    tag: "Why MT5 Web",
    headline: "MT5 Web when you need it without the download.",
    body: "Open a browser. Trade. No download, no setup, no waiting. Full MT5 platform in any browser on any device.",
    ctaLabel: "Open MT5 Web Now",
    features: webFeatures,
    featureHeading: "Open a browser. Trade. No download needed.",

  },
};


interface PlatformsUIProps {
  defaultTab?: Tab;
}

const PlatformsUI = ({ defaultTab = "MT5 Desktop" }: PlatformsUIProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const { isMobile } = useDeviceSize(600);
  const content = tabContent[activeTab];

  const heroImage =
    activeTab === "MT5 Desktop"
      ? isMobile
        ? mt5_desktop_mobile
        : mt5_desktop
      : activeTab === "MT5 Mobile"
        ? mt5_mobile
        : null;

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.hero__inner}`}>
          <div className={styles.hero__text}>
            <p className={styles.hero__eyebrow}>PLATFORMS</p>
            <h1 className={styles.hero__ttl}>Your platform. Three ways in.</h1>
            <p className={styles.hero__sub}>
              MT5 Desktop for serious sessions. MT5 Mobile for trading on the
              move. MT5 Web when you need it without the download. All three,
              included with every FARLO account.
            </p>
          </div>

          {/* ── Tab switcher ── */}
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tab} ${activeTab === tab ? styles["tab--active"] : ""
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Section bgClassName={styles.panelBg} sectionClassName={styles.panel}>
        <div className={styles.panel__grid}>
          <div className={styles.panel__copy}>
            <p className={styles.panel__headline}>{content.headline}</p>
            <p className={styles.panel__body}>{content.body}</p>

            <p className={styles.panel__shared}>
              Real-time quotes across all 350+ instruments. One-click trading
              with SL/TP. Full trade history and P&amp;L reporting. All account
              types supported.
            </p>

            <div className={styles.panel__ctas}>
              <Button variant="fill-red">
                {content.ctaLabel} <ArrowRight />
              </Button>
              {activeTab === "MT5 Desktop" && (
                <>
                  <AppStore />
                  <PlayStore2 />
                </>
              )}
              {activeTab === "MT5 Mobile" && (
                <>
                  <AppStore />
                  <PlayStore2 />

                </>
              )}
              {activeTab === "MT5 Web" && (
                <></>
              )}
            </div>
          </div>

          <div className={styles.panel__img}>
            {heroImage ? (
              <Image
                src={heroImage}
                alt={`${activeTab} screenshot`}
                className={styles.panel__screenshot}
                width={600}
                height={400}
              />
            ) : (
              <div className={styles.panel__webPlaceholder}>
                <span className={styles.panel__webIcon}>🌐</span>
                <p>Any browser. Any device.</p>

              </div>
            )}
          </div>
        </div>
      </Section>

      <Section sectionClassName={styles.features}>
        <div className={styles.features__header}>
          <p className={styles.features__tag}>{content.tag}</p>
          <h2 className={styles.features__ttl}>{content.featureHeading}</h2>
        </div>
        <div className={styles.features__cards}>
          {content.features.map(({ img, title, text }) => (
            <div key={title} className={styles.features__card}>
              <Image src={img} width={48} height={48} alt={title} />
              <p className={styles.features__card__ttl}>{title}</p>
              <p className={styles.features__card__txt}>{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <GettingStarted />

      <BottomBanner
        title="Your platform. Three ways in."
        text="MT5 Desktop, Mobile, and Web all included with every FARLO account. No extra setup."
        fillBtn={{ text: "Download MT5", action: console.log }}
        outlineBtn={{ text: "Open Account", action: console.log }}
      />
    </>
  );
};

export { PlatformsUI };
