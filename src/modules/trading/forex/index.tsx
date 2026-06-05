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
  // faqs={faqs}
  />
);

export { ForexUI };
