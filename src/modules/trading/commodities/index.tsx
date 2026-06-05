"use client";

import { trading_hero_5 } from "@/assets/images";
import { InstrumentPage } from "../_components/instrument-page";
import { FAQData } from "@/components/faqs/accordion";

const faqs: FAQData[] = [
  {
    question: "What commodities can I trade on FARLO?",
    answer: "FARLO offers gold (XAU/USD), silver (XAG/USD), crude oil (USOIL), natural gas, and more. All available as CFDs on MT5 with real-time pricing.",
  },
  {
    question: "What are the spreads on gold?",
    answer: "Gold (XAU/USD) spreads start from 0.4 pips on Standard accounts and from 0.2 pips raw on Pro accounts. No dealing desk markup.",
  },
  {
    question: "Is commodity trading available 24/5?",
    answer: "Gold and silver trade 24 hours on weekdays. Oil has specific session hours that follow the CME schedule. Full trading hours are shown in MT5.",
  },
  {
    question: "Can I short commodities?",
    answer: "Yes. CFDs allow you to go short on any commodity — profit when gold falls or oil drops without needing to own the underlying asset.",
  },
];

const CommoditiesUI = () => (
  <InstrumentPage
    tag="COMMODITIES"
    heroTitle={<>Commodities. No noise. Just the market.</>}
    heroSubhead="Trade gold, silver, oil, and more with tight spreads, leverage up to 1:500, and 30ms execution via MT5."
    heroImage={trading_hero_5}
    heroImageAlt="Gold bars and a dollar sign"
    specsFrom="0.4 pips"
    specsLeverage="1:500"
    specsHours="24 hours, 5 days"
    specsCount="10+ commodities"
    whatHeading="Hard assets. Traded with precision."
    whatBody="Commodities — gold, silver, oil — move on global supply, demand, and geopolitics. They behave differently from equities, which makes them powerful for diversification and hedging. FARLO gives you access to all major commodities as CFDs on MT5, long or short, with institutional pricing."
    whyPoints={[
      "Gold from 0.4 pips — some of the tightest spreads on XAU/USD available.",
      "Go long or short — profit whether gold rises or oil falls.",
      "Deposit in NGN, GHS, KES, or USD. No SWIFT wire required.",
    ]}
    tableRows={[
      { symbol: "XAU/USD", description: "Gold vs Dollar", spread: "from 0.4 pips", session: "24/5" },
      { symbol: "XAG/USD", description: "Silver vs Dollar", spread: "from 1.5 pips", session: "24/5" },
      { symbol: "USOIL", description: "US Crude Oil (WTI)", spread: "from 3 pts", session: "Mon–Fri, CME hours" },
      { symbol: "UKOIL", description: "Brent Crude Oil", spread: "from 3 pts", session: "Mon–Fri, CME hours" },
      { symbol: "XPTUSD", description: "Platinum vs Dollar", spread: "from 2.0 pips", session: "24/5" },
      { symbol: "NATGAS", description: "Natural Gas", spread: "from 4 pts", session: "Mon–Fri, CME hours" },
    ]}
  // faqs={faqs}
  />
);

export { CommoditiesUI };