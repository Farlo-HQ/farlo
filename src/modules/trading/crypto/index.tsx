

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
  // faqs={faqs}
  />
);

export { CryptoUI };
