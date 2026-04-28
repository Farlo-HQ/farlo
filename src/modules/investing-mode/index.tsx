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
    question: "Are these real shares or CFDs?",
    answer:
      "Real shares. These are actual US equities held in a regulated brokerage account in your name via Alpaca. You own the stock. Dividends are yours. This is not a CFD.",
  },
  {
    question: "Do I need a US bank account?",
    answer:
      "No. You fund your FARLO master wallet in NGN, GHS, KES, or USD via Paystack, USDT, or card. Funds are allocated to your Alpaca sub-account instantly. No wire transfer required.",
  },
  {
    question: "How do I access Investing Mode?",
    answer:
      "Switch to Investing Mode from your FARLO dashboard. Your Alpaca sub-account was provisioned when you completed KYC. No second sign-up or separate application.",
  },
  {
    question: "What happens to dividends?",
    answer:
      "Dividends from US stocks are paid into your Alpaca sub-account automatically. You can reinvest or transfer back to your master wallet.",
  },
  {
    question: "Can I hold both trades and investments at the same time?",
    answer:
      "Yes. Your FARLO master wallet feeds both modes simultaneously. Allocate to Trading Mode for FX and CFDs, Investing Mode for US equities. Switch or rebalance anytime.",
  },
];

const instruments = [
  { category: "US Stocks", examples: "AAPL, NVDA, TSLA, MSFT, AMZN, and 1,000+ more" },
  { category: "ETFs", examples: "SPY, QQQ, VOO" },
  { category: "Fractional Shares", examples: "From $1 per share" },
  { category: "Stock Options", examples: "Coming soon" },
];

const differentiators = [
  {
    title: "Real ownership.",
    body: "This is not a CFD. These are actual shares held in a regulated US brokerage account in your name. Dividends are yours.",
  },
  {
    title: "No US bank account.",
    body: "Fund in NGN, GHS, KES, or USD. Paystack, USDT, or card. No SWIFT wire required.",
  },
  {
    title: "One KYC.",
    body: "You verified once when you joined FARLO. Your Alpaca sub-account was already provisioned. No second sign-up.",
  },
  {
    title: "Instant allocation.",
    body: "Funds move from your master wallet to Investing Mode in seconds. No delay between deposit and trade.",
  },
];

const InvestingModeUI = () => {
  const router = useRouter();
  return (
    <>
      <HeroSection2
        tag="INVESTING MODE"
        title={
          <>
            US stocks.<br /> From anywhere in Emerging markets.
          </>
        }
        text={
          "Buy Apple, NVIDIA, and the S&P 500 from Lagos, Cairo, Nairobi, or Accra. Regulated access via Alpaca. No US bank account. No wire transfer."
        }
        bgClassName={styles.heroBg}
        btn1={{ text: "Start Investing in US Stocks", action: () => router.push(ROUTES.signup) }}
      />

      <Section bgClassName={styles.diffBg} sectionClassName={styles.diffSection}>
        <div className={styles.diffHeader}>
          <p className={styles.label}>WHAT MAKES THIS DIFFERENT</p>
          <h2 className={styles.ttl}>
            Not a CFD. Real shares.<br /> Real ownership. Real dividends.
          </h2>
        </div>
        <div className={styles.diffGrid}>
          {differentiators.map(({ title, body }) => (
            <div key={title} className={styles.diffCard}>
              <p className={styles.diffCard__title}>{title}</p>
              <p className={styles.diffCard__body}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bgClassName={styles.instrBg} sectionClassName={styles.instrSection}>
        <div className={styles.instrContent}>
          <div className={styles.instrText}>
            <p className={styles.label}>AVAILABLE INSTRUMENTS</p>
            <h2 className={styles.ttl}>
              Everything the US market offers.<br /> From your FARLO account.
            </h2>
            <p className={styles.instrBody}>
              Over 1,000 US stocks, ETFs, and fractional shares. All available the moment you switch to Investing Mode.
            </p>
            <Button onClick={() => router.push(ROUTES.signup)}>
              Start Investing <ArrowRight />
            </Button>
          </div>
          <div className={styles.instrList}>
            {instruments.map(({ category, examples }) => (
              <div key={category} className={styles.instrItem}>
                <p className={styles.instrItem__cat}>{category}</p>
                <p className={styles.instrItem__ex}>{examples}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FAQS title="Frequently asked questions" />

      <BottomBanner
        title="US stocks. From anywhere in Emerging markets."
        text="Switch to Investing Mode from your FARLO dashboard. Your Alpaca sub-account was provisioned when you completed KYC. No second sign-up."
        fillBtn={{ text: "Start Investing in US Stocks", action: () => router.push(ROUTES.signup) }}
      // outlineBtn={{ text: "Open Demo", action: () => router.push(ROUTES.signup) }}
      />
    </>
  );
};

export { InvestingModeUI };
