// import { trading_hero_4, trading_stocks } from "@/assets/images";
// import { HeroSection2 } from "@/components/heroSection2";
// import Image from "next/image";
// import styles from "./styles.module.scss";
// import { Spreads } from "./spreads";
// import { GettingStarted } from "@/components";
// import { MarketDive } from "./market-dive";
// import { BottomBanner } from "@/components/bottom-banner";
// import { WhyFarlo } from "../_components/why-farlo";

// const list = [
//   {
//     title: "Advanced Trading Platforms",
//     text: "Execute trades on MT5, equipped with built-in indicators, technical analysis tools, and fully customizable reports."
//   },
//   {
//     title: "Ultra-Competitive Conditions",
//     text: "Enjoy raw spreads from 0.0 pips, execution speeds as low as 30 milliseconds, and leverage up to 1:1000.",
//   },
//   {
//     title: "Secure & Instant Transactions",
//     text: "Deposit and withdraw seamlessly with multiple payment options and segregated client accounts.",
//   },
//   {
//     title: "Market Education & Insights",
//     text: "Access in-depth eBooks, webinars, and expert market analysis to refine your trading strategy.",
//   },
//   {
//     title: "Dedicated Customer Support",
//     text: "Our multilingual support team is available 24/5 to assist with any trading inquiries.",
//   },
// ];

// const StocksUI = () => {
//   return (
//     <>
//       <HeroSection2
//         tag="STOCKS"
//         title={<>Access The World’s Biggest Companies</>}
//         text={"Gain direct access to global stock markets and trade shares of top-performing companies with minimal transaction costs."
//         }
//         bgClassName={styles.bg}
//         sectionClassName={styles.hero}
//         element={
//           <Image
//             className={styles.img}
//             src={trading_hero_4}
//             alt="Pie chart and coins"
//           />
//         }
//         btn1={{ text: "Register", action: console.log }}
//         btn2={{ text: "Open Demo", action: console.log }}
//       />
//       <WhyFarlo
//         tag="Why FarloFX"
//         title={
//           <>
//            Stock Trading Made Easy
//           </>
//         }
//         list={list}
//         image={trading_stocks}
//       />
//       <MarketDive />
//       <Spreads />
//       <GettingStarted greyBg />
//       <BottomBanner
//         title="Start trading the world's most popular currency pairs today"
//         text="Don’t miss another market opportunity. FarloFX provides the tools, pricing, and execution speed to elevate your forex trading experience."
//         fillBtn={{ text: "Blog", action: console.log }}
//         outlineBtn={{ text: "Education", action: console.log }}
//       />
//     </>
//   );
// };

// export { StocksUI };


"use client";

import { trading_hero_4 } from "@/assets/images";
import { InstrumentPage } from "../_components/instrument-page";
import { FAQData } from "@/components/faqs/accordion";

const faqs: FAQData[] = [
  {
    question: "What is the difference between stock CFDs and real shares?",
    answer: "Stock CFDs are derivatives — you trade on price movement without owning the stock. Real shares in Investing Mode are actual equity held in a US brokerage account in your name. Dividends are yours. Ownership is real.",
  },
  {
    question: "Can I invest in US stocks from Emerging markets?",
    answer: "Yes. FARLO's Investing Mode gives you real access to US equities via Alpaca, a US brokerage. No US bank account required. Fund in NGN, GHS, KES, or USD via Paystack.",
  },
  {
    question: "What stocks are available?",
    answer: "Over 1,000 US stocks and ETFs are available in Investing Mode including AAPL, NVDA, TSLA, MSFT, AMZN, SPY, QQQ, and VOO. Fractional shares available from $1.",
  },
  {
    question: "What leverage is available on stock CFDs?",
    answer: "Stock CFDs offer leverage up to 1:20 on Standard accounts. Leverage varies by stock based on volatility. Full details are shown in MT5 before you open a position.",
  },
];

const StocksUI = () => (
  <InstrumentPage
    tag="STOCKS"
    heroTitle={<>Stocks. No noise. Just the market.</>}
    heroSubhead="Trade CFDs on 100+ US stocks, or invest in real US equities via Investing Mode. AAPL, NVDA, TSLA — from Lagos, no US bank account needed."
    heroImage={trading_hero_4}
    heroImageAlt="Pie chart and coins representing stock market"
    specsFrom="0.0 commission"
    specsLeverage="1:20"
    specsHours="NYSE & NASDAQ hours"
    specsCount="1,000+ stocks"
    whatHeading="Own a piece of the world's biggest companies."
    whatBody="US stocks give you a share of Apple, NVIDIA, Tesla, and thousands more. FARLO offers two ways in: stock CFDs via MT5 for leveraged trading, and real share ownership via Investing Mode — held in a US brokerage account in your name."
    whyPoints={[
      "Real US shares via Investing Mode — actual ownership with dividends.",
      "No US bank account needed. Fund in NGN, GHS, KES, or USD via Paystack.",
      "Fractional shares from $1. Own Apple without needing $190.",
    ]}
    tableRows={[
      { symbol: "AAPL", description: "Apple Inc.", spread: "from $0.02", session: "NYSE, 9:30–16:00 ET" },
      { symbol: "NVDA", description: "NVIDIA Corporation", spread: "from $0.05", session: "NASDAQ, 9:30–16:00 ET" },
      { symbol: "TSLA", description: "Tesla Inc.", spread: "from $0.04", session: "NASDAQ, 9:30–16:00 ET" },
      { symbol: "MSFT", description: "Microsoft Corporation", spread: "from $0.02", session: "NASDAQ, 9:30–16:00 ET" },
      { symbol: "AMZN", description: "Amazon.com Inc.", spread: "from $0.03", session: "NASDAQ, 9:30–16:00 ET" },
      { symbol: "SPY", description: "S&P 500 ETF Trust", spread: "from $0.01", session: "NYSE, 9:30–16:00 ET" },
    ]}
  // faqs={faqs}
  />
);

export { StocksUI };