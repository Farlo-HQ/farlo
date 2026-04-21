// import { trading_hero_2, trading_indices } from "@/assets/images";
// import { HeroSection2 } from "@/components/heroSection2";
// import Image from "next/image";
// import styles from "./styles.module.scss";
// import { Spreads } from "./spreads";
// import { GettingStarted } from "@/components";
// import { MarketDive } from "./market-dive";
// import { FAQS } from "@/components/faqs";
// import { BottomBanner } from "@/components/bottom-banner";
// import { FAQData } from "@/components/faqs/accordion";
// import { WhyFarlo } from "../_components/why-farlo";

// const faqs: FAQData[] = [
//   {
//     question: "What are indices in trading?",
//     answer:
//       "Indices are measures of the performance of a group of assets, typically stocks. They allow traders to speculate on the broader market trends without investing in individual stocks.",
//   },
//   {
//     question: "How does index trading work?",
//     answer:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
//   },
//   {
//     question: "How can you trade on indices profitably?",
//     answer:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
//   },
// ];

// const list = [
//   {
//     title: "Global Market Access",
//     text: "Trade major indices that reflect entire national stock markets instead of individual stocks.",
//   },
//   {
//     title: "Go Long or Short",
//     text: "Profit from both bullish and bearish market trends with equal flexibility.",
//   },
//   {
//     title: "Leverage Up to 1:400",
//     text: "Amplify your exposure while maintaining precise risk control.",
//   },
//   {
//     title: "Tight Spreads & Low Commissions",
//     text: "Maximize profits with some of the lowest trading costs in the industry.",
//   },
//   {
//     title: "Expert Advisors & Trading Signals",
//     text: "Automate your trades and enhance your strategy with market insights.",
//   },
// ];

// const IndicesUI = () => {
//   return (
//     <>
//       <HeroSection2
//         tag="INDICES"
//         title={
//           <>
//             Trade Your <br />
//             Favourite Indexes
//           </>
//         }
//         text={
//           "Gain exposure to the most liquid and influential indices from global financial markets."
//         }
//         bgClassName={styles.bg}
//         sectionClassName={styles.hero}
//         element={
//           <Image
//             className={styles.img}
//             src={trading_hero_2}
//             alt="stacked coins"
//           />
//         }
//         btn1={{ text: "Register", action: console.log }}
//         btn2={{ text: "Open Demo", action: console.log }}
//       />
//       <WhyFarlo
//         tag="Why FarloFX"
//         title={
//           <>
//             Benefits of trading indices on <span>FarloFX</span>
//           </>
//         }
//         list={list}
//         image={trading_indices}
//       />
//       <MarketDive />
//       <Spreads />
//       <GettingStarted greyBg />
//       <FAQS title="FarloFX Index Trading FAQs" faqs={faqs} />
//       <BottomBanner
//         title="Start trading the world's most popular currency pairs today"
//         text="Don’t miss another market opportunity. FarloFX provides the tools, pricing, and execution speed to elevate your forex trading experience."
//         fillBtn={{ text: "Blog", action: console.log }}
//         outlineBtn={{ text: "Education", action: console.log }}
//       />
//     </>
//   );
// };

// export { IndicesUI };

"use client";

import { trading_hero_2 } from "@/assets/images";
import { InstrumentPage } from "../_components/instrument-page";
import { FAQData } from "@/components/faqs/accordion";

const faqs: FAQData[] = [
  {
    question: "What indices can I trade on FARLO?",
    answer: "FARLO offers 20+ global indices including US30 (Dow Jones), NAS100 (Nasdaq 100), FTSE100 (UK), DE40 (Germany), and more. All available on MT5 with real-time pricing.",
  },
  {
    question: "What are the spreads on index CFDs?",
    answer: "Spreads vary by index. US30 typically from 1.5 points. NAS100 from 1.0 points. Full spread details are available in the Spreads table above.",
  },
  {
    question: "Can I use leverage on indices?",
    answer: "Yes. Standard accounts offer up to 1:500 leverage on indices. Pro accounts up to 1:1000. Leverage can be adjusted per position in your MT5 settings.",
  },
  {
    question: "What hours can I trade indices?",
    answer: "Index trading hours follow the underlying exchange. US indices trade during New York hours. European indices during London hours. Exact session times are shown in MT5.",
  },
];

const IndicesUI = () => (
  <InstrumentPage
    tag="INDICES"
    heroTitle={<>Indices. No noise. Just the market.</>}
    heroSubhead="Trade 20+ global indices including US30, NAS100, and FTSE100. Tight spreads. Leverage up to 1:500. Fund in your local currency."
    heroImage={trading_hero_2}
    heroImageAlt="Stacked coins representing global indices"
    specsFrom="0.8 points"
    specsLeverage="1:500"
    specsHours="exchange hours"
    specsCount="20+ indices"
    whatHeading="Trade an entire economy in one position."
    whatBody="Indices are measures of the performance of a group of stocks — one trade gives you exposure to an entire market. US30 covers 30 of the largest US companies. NAS100 covers the top 100 US tech stocks. FARLO gives you access to all of them via CFDs on MT5."
    whyPoints={[
      "Go long or short on any index — profit whether markets rise or fall.",
      "No ownership of individual stocks required. One position, full exposure.",
      "Tight spreads on US30, NAS100, FTSE100, and DE40 with 30ms MT5 execution.",
    ]}
    tableRows={[
      { symbol: "US30", description: "Dow Jones Industrial Average", spread: "from 1.5 pts", session: "Mon–Fri, NY hours" },
      { symbol: "NAS100", description: "Nasdaq 100", spread: "from 1.0 pts", session: "Mon–Fri, NY hours" },
      { symbol: "SPX500", description: "S&P 500", spread: "from 0.8 pts", session: "Mon–Fri, NY hours" },
      { symbol: "FTSE100", description: "UK 100", spread: "from 1.0 pts", session: "Mon–Fri, London hours" },
      { symbol: "DE40", description: "Germany 40", spread: "from 1.2 pts", session: "Mon–Fri, Frankfurt hours" },
      { symbol: "JP225", description: "Japan 225", spread: "from 8.0 pts", session: "Mon–Fri, Tokyo hours" },
    ]}
    faqs={faqs}
  />
);

export { IndicesUI };
