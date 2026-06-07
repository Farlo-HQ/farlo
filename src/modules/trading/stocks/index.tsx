
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