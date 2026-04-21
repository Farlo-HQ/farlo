// import { trading_forex_coins, trading_hero_1 } from "@/assets/images";
// import { HeroSection2 } from "@/components/heroSection2";
// import Image from "next/image";
// import styles from "./styles.module.scss";
// import { Spreads } from "./spreads";
// import { GettingStarted } from "@/components";
// import { TradingHours } from "./trading-hours";
// import { FAQS } from "@/components/faqs";
// import { BottomBanner } from "@/components/bottom-banner";
// import { FAQData } from "@/components/faqs/accordion";
// import { WhyFarlo } from "../_components/why-farlo";
// import { SpecStrip } from "./spec-strip";

// const faqs: FAQData[] = [
//   {
//     question: "Is Farlo FX regulated?",
//     answer:
//       "Farlo FX is a regulated broker, holding multiple regulatory licenses from several financial authorities across the globe such as the Seychelles Financial Services Authority (FSA), Cyprus Securities and Exchange Commission (CySEC)*, the Financial Conduct Authority (FCA) in the UK*, South Africa Financial Sector Conduct Authority (FSCA), Central Bank of Curacao and Sint Maarten (CBCS), Financial Services Commission (FSC) in the British Virgin Islands, Financial Services Commission (FSC) in Mauritius, Capital Markets Authority (CMA) in Kenya, and the Jordan Securities Commission (JSC).",
//   },
//   {
//     question: "In which countries is Farlo FX regulated?",
//     answer:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
//   },
//   {
//     question:
//       "What is the difference between a regulated broker and an unregulated broker",
//     answer:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
//   },
//   {
//     question: "How can I create an Farlo account?",
//     answer:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
//   },
// ];

// const list = [
//   {
//     title: "Stop Out Protection",
//     text: "Shield your trades from extreme volatility with automated risk management.",
//   },
//   {
//     title: "Instant Payouts",
//     text: "Access your earnings with swift withdrawals and instant transaction processing.",
//   },
//   {
//     title: "Next-Gen Trading Platforms",
//     text: "Trade on MT5, fully equipped with advanced charting, indicators, and automation.",
//   },
//   {
//     title: "Capitalize on Currency Movements",
//     text: "Trade major, minor, and exotic pairs with ultra-low spreads.",
//   },
//   {
//     title: "Precision Execution",
//     text: "Execute trades in milliseconds with institutional-grade technology.",
//   },
//   {
//     title: "Low and Stable Spreads",
//     text: "Enjoy consistent pricing, even during high-impact news events.",
//   },
// ];

// const ForexUI = () => {
//   return (
//     <>
//       <HeroSection2
//         tag="FOREX"
//         title={
//           <>
//             Forex.
//             <br />
//             The world's largest market, in your hands.
//           </>
//         }
//         text={
//           "Trade 60+ currency pairs including USD/NGN, EUR/USD, and GBP/USD. Tight spreads. 30ms execution. Fund in your local currency."
//         }
//         bgClassName={styles.bg}
//         element={
//           <Image
//             className={styles.img}
//             src={trading_hero_1}
//             alt="currencies wrapped around a twisting arrow pointing upwards"
//           />
//         }
//         btn1={{ text: "Register", action: console.log }}
//         btn2={{ text: "Open Demo", action: console.log }}
//       />
//       <SpecStrip />
//       <WhyFarlo
//         tag="Why Farlo"
//         title={
//           <>
//             Your <span>forex advantage</span> starts here
//           </>
//         }
//         list={list}
//         image={trading_forex_coins}
//       />
//       <Spreads />
//       <GettingStarted greyBg />
//       <TradingHours />
//       <FAQS title="Frequently asked questions" faqs={faqs} />
//       <BottomBanner />
//     </>
//   );
// };

// export { ForexUI };

"use client";

import { trading_hero_1 } from "@/assets/images";
import { InstrumentPage } from "../_components/instrument-page";
import { FAQData } from "@/components/faqs/accordion";

const faqs: FAQData[] = [
  {
    question: "What currency pairs can I trade on FARLO?",
    answer: "FARLO offers 60+ currency pairs including major pairs (EUR/USD, GBP/USD, USD/JPY), minors, exotics, and African pairs including USD/NGN. All pairs are available on MT5 with real-time pricing.",
  },
  {
    question: "What are FARLO's forex spreads?",
    answer: "Spreads start from 0.6 pips on Standard accounts and from 0.4 pips raw on Pro accounts. There is no dealing desk markup. What you see is what you trade.",
  },
  {
    question: "Can I deposit in my local currency?",
    answer: "Yes. FARLO accepts deposits in NGN, GHS, KES, and USD via Paystack, USDT (TRC20/ERC20), card, and bank wire. Funds appear in your account instantly for Paystack and USDT.",
  },
  {
    question: "What leverage is available on forex?",
    answer: "Standard accounts offer up to 1:500 leverage. Pro accounts offer up to 1:1000. Leverage is set per instrument and can be adjusted in your account settings.",
  },
];

const ForexUI = () => (
  <InstrumentPage
    tag="FOREX"
    heroTitle={<>Forex. The world&apos;s largest market, in your hands.</>}
    heroSubhead="Trade 60+ currency pairs including USD/NGN, EUR/USD, and GBP/USD. Tight spreads. 30ms execution. Fund in your local currency."
    heroImage={trading_hero_1}
    heroImageAlt="Currencies wrapped around a twisting arrow pointing upwards"
    specsFrom="0.6 pips"
    specsLeverage="1:1000"
    specsHours="24 hours, 5 days"
    specsCount="60+ pairs"
    whatHeading="The largest financial market in the world."
    whatBody="The foreign exchange market moves $7.5 trillion every day. It is the most liquid market in the world. Prices change by the second. FARLO gives you access to the same pricing as institutional desks, without the institutional minimum."
    whyPoints={[
      "Raw spreads from 0.6 pips with no dealing desk markup.",
      "Deposit in NGN, GHS, KES, or USD via Paystack. No wire required.",
      "Trade USD/NGN and other African pairs alongside global majors.",
    ]}
    tableRows={[
      { symbol: "EUR/USD", description: "Euro vs Dollar", spread: "from 0.6 pips", session: "24/5" },
      { symbol: "GBP/USD", description: "Pound vs Dollar", spread: "from 0.8 pips", session: "24/5" },
      { symbol: "USD/NGN", description: "Dollar vs Naira", spread: "from 2 pips", session: "24/5" },
      { symbol: "USD/JPY", description: "Dollar vs Yen", spread: "from 0.7 pips", session: "24/5" },
      { symbol: "XAU/USD", description: "Gold vs Dollar", spread: "from 0.4 pips", session: "24/5" },
      { symbol: "GBP/JPY", description: "Pound vs Yen", spread: "from 1.2 pips", session: "24/5" },
    ]}
    faqs={faqs}
  />
);

export { ForexUI };
