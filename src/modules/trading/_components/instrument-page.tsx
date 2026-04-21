"use client";

import { ReactNode } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { HeroSection2 } from "@/components/heroSection2";
import { Section } from "@/components";
import { Button } from "@/components/button";
import { GettingStarted } from "@/components";
import { FAQS } from "@/components/faqs";
import { BottomBanner } from "@/components/bottom-banner";
import { FAQData } from "@/components/faqs/accordion";
import { ArrowRight } from "@/assets/icons/arrow-right";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import styles from "./styles.module.scss";

export interface InstrumentRow {
  symbol: string;
  description: string;
  spread: string;
  session: string;
}

export interface InstrumentPageProps {
  tag: string;
  heroTitle: ReactNode;
  heroSubhead: string;
  heroImage: StaticImageData;
  heroImageAlt: string;
  specsFrom: string;
  specsLeverage: string;
  specsHours: string;
  specsCount: string;
  whatHeading: string;
  whatBody: string;
  whyPoints: [string, string, string];
  tableRows: InstrumentRow[];
  faqs: FAQData[];
}

const SpecStrip = ({
  from,
  leverage,
  hours,
  count,
}: {
  from: string;
  leverage: string;
  hours: string;
  count: string;
}) => (
  <div className={styles.spec}>
    <div className={styles.spec__item}>
      <span className={styles.spec__value}>Spreads from {from}</span>
    </div>
    <span className={styles.spec__divider} aria-hidden>|</span>
    <div className={styles.spec__item}>
      <span className={styles.spec__value}>Leverage up to {leverage}</span>
    </div>
    <span className={styles.spec__divider} aria-hidden>|</span>
    <div className={styles.spec__item}>
      <span className={styles.spec__value}>Available {hours}</span>
    </div>
    <span className={styles.spec__divider} aria-hidden>|</span>
    <div className={styles.spec__item}>
      <span className={styles.spec__value}>{count}</span>
    </div>
  </div>
);

const InstrumentTable = ({ rows }: { rows: InstrumentRow[] }) => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Description</th>
          <th>Typical spread</th>
          <th>Session hours</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ symbol, description, spread, session }) => (
          <tr key={symbol}>
            <td className={styles.table__symbol}>{symbol}</td>
            <td>{description}</td>
            <td>{spread}</td>
            <td>{session}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InstrumentPage = ({
  tag,
  heroTitle,
  heroSubhead,
  heroImage,
  heroImageAlt,
  specsFrom,
  specsLeverage,
  specsHours,
  specsCount,
  whatHeading,
  whatBody,
  whyPoints,
  tableRows,
  faqs,
}: InstrumentPageProps) => {
  const router = useRouter();
  const openAccount = () => router.push(ROUTES.signup);

  return (
    <>
      <HeroSection2
        tag={tag}
        title={heroTitle}
        text={heroSubhead}
        bgClassName={styles.heroBg}
        element={
          <Image
            className={styles.heroImg}
            src={heroImage}
            alt={heroImageAlt}
          />
        }
        btn1={{ text: "Open Account", action: openAccount }}
        btn2={{ text: "Open Demo", action: openAccount }}
      />

      <SpecStrip
        from={specsFrom}
        leverage={specsLeverage}
        hours={specsHours}
        count={specsCount}
      />

      <Section bgClassName={styles.whatBg} sectionClassName={styles.whatSection}>
        <div className={styles.what}>
          <div className={styles.what__text}>
            <p className={styles.sectionLabel}>WHAT YOU ARE TRADING</p>
            <h2 className={styles.what__ttl}>{whatHeading}</h2>
            <p className={styles.what__body}>{whatBody}</p>
          </div>
          <div className={styles.why}>
            <p className={styles.sectionLabel}>WHY TRADE IT ON FARLO</p>
            <ul className={styles.why__list}>
              {whyPoints.map((point) => (
                <li key={point} className={styles.why__item}>
                  <span className={styles.why__dot} aria-hidden>→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section bgClassName={styles.tableBg} sectionClassName={styles.tableSection}>
        <p className={styles.sectionLabel}>POPULAR INSTRUMENTS</p>
        <h2 className={styles.tableHeading}>
          The instruments your clients actually trade.
        </h2>
        <InstrumentTable rows={tableRows} />
      </Section>

      <GettingStarted greyBg />

      <FAQS title="Frequently asked questions" faqs={faqs} />

      <BottomBanner
        fillBtn={{ text: "Open Account", action: openAccount }}
        outlineBtn={{ text: "Open Demo", action: openAccount }}
      />
    </>
  );
};

export { InstrumentPage };