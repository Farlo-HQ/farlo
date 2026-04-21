// import { trading_crypto_coins, trading_hero_3 } from "@/assets/images";
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
//     title: "Ultra-Competitive Spreads & Leverage",
//     text: "Tight spreads and leverage up to 1:500 to maximize your trading potential.",
//   },
//   {
//     title: "Instant & Secure Transactions",
//     text: "Fund your account with lightning-fast deposits and withdrawals using multiple payment options.",
//   },
//   {
//     title: "Globally Regulated Broker",
//     text: "Trade confidently with a licensed and regulated broker recognized by major financial authorities.",
//   },
//   {
//     title: "Intuitive & Mobile-Friendly Platform",
//     text: "Start trading in just a few clicks on desktop or mobile via our FarloFX app.",
//   },
//   {
//     title: "Real-Time Transparent Pricing",
//     text: "Trade with live market prices 24/7, ensuring zero manipulation and full transparency.",
//   },
// ];

// const CryptoUI = () => {
//   return (
//     <>
//       <HeroSection2
//         tag="CRYPTO"
//         title={<>Trade Cryptocurrencies With Precision & Speed</>}
//         text={
//           "Access and trade top cryptocurrencies like BTCUSD and ETHUSD with zero overnight fees and seamless execution."
//         }
//         bgClassName={styles.bg}
//         sectionClassName={styles.hero}
//         element={
//           <Image
//             className={styles.img}
//             src={trading_hero_3}
//             alt="crypto coins charting upwards"
//           />
//         }
//         btn1={{ text: "Register", action: console.log }}
//         btn2={{ text: "Open Demo", action: console.log }}
//       />
//       <WhyFarlo
//         tag="How it works"
//         title={
//           <>
//             {" "}
//             A Smarter Way To <span>Trade</span> Digital Assets
//           </>
//         }
//         list={list}
//         image={trading_crypto_coins}
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

// export { CryptoUI };

"use client";

import { trading_hero_3 } from "@/assets/images";
import { InstrumentPage } from "../_components/instrument-page";
import { FAQData } from "@/components/faqs/accordion";

const faqs: FAQData[] = [
  {
    question: "Are these real crypto or CFDs?",
    answer: "FARLO offers crypto CFDs — you trade on price movement without owning the underlying coins. No wallet required. No private keys. Full access from any MT5 device.",
  },
  {
    question: "What leverage is available on crypto?",
    answer: "Crypto CFDs carry leverage up to 1:10 on Standard accounts due to the higher volatility of the underlying assets. This can be adjusted in your MT5 settings.",
  },
  {
    question: "Which cryptocurrencies are available?",
    answer: "BTC/USD, ETH/USD, SOL/USD, BNB/USD, XRP/USD, ADA/USD, and more. Full list is available inside the MT5 platform.",
  },
  {
    question: "Can I deposit in crypto?",
    answer: "Yes. FARLO accepts USDT deposits via TRC20 and ERC20 networks. Funds appear in your account instantly with no conversion delay.",
  },
];

const CryptoUI = () => (
  <InstrumentPage
    tag="CRYPTO"
    heroTitle={<>Crypto. No noise. Just the market.</>}
    heroSubhead="Trade Bitcoin, Ethereum, Solana, and 20+ crypto CFDs. Leverage up to 1:10. 30ms execution on MT5. No wallet needed."
    heroImage={trading_hero_3}
    heroImageAlt="Crypto coins charting upwards"
    specsFrom="variable"
    specsLeverage="1:10"
    specsHours="24/7"
    specsCount="20+ tokens"
    whatHeading="Crypto price action, without the complexity."
    whatBody="Cryptocurrency CFDs let you trade the price movement of Bitcoin, Ethereum, and 20+ tokens without managing a wallet, private keys, or on-chain transfers. Go long or short. Use leverage. Trade from MT5 on any device."
    whyPoints={[
      "No wallet required — trade BTC, ETH, SOL without any on-chain setup.",
      "Deposit via USDT (TRC20/ERC20) — instant, no conversion delay.",
      "Go long or short — profit whether Bitcoin rises or falls.",
    ]}
    tableRows={[
      { symbol: "BTC/USD", description: "Bitcoin vs Dollar", spread: "from 15 pts", session: "24/7" },
      { symbol: "ETH/USD", description: "Ethereum vs Dollar", spread: "from 1.5 pts", session: "24/7" },
      { symbol: "SOL/USD", description: "Solana vs Dollar", spread: "from 0.5 pts", session: "24/7" },
      { symbol: "BNB/USD", description: "Binance Coin vs Dollar", spread: "from 0.8 pts", session: "24/7" },
      { symbol: "XRP/USD", description: "Ripple vs Dollar", spread: "from 0.002 pts", session: "24/7" },
      { symbol: "ADA/USD", description: "Cardano vs Dollar", spread: "from 0.001 pts", session: "24/7" },
    ]}
    faqs={faqs}
  />
);

export { CryptoUI };
