

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
  // faqs={faqs}
  />
);

export { IndicesUI };
