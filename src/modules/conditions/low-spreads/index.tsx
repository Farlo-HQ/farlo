
import { AlternateList } from "@/components";


const LowSpreads = () => {
  const list = [
    {
      title: "Ultra-Low Spreads Across All Markets",
      text: "Trade forex, stocks, indices, and commodities with minimal cost.",
    },
    {
      title: "Zero Commission on Many Trades",
      text: "Maximize profits without hidden fees.",
    },
    {
      title: "Stable & Transparent Pricing",
      text: "Enjoy predictable trading costs even during high-volatility periods.",
    },
  ];

  return (
    <AlternateList
      tag="Spreads and Commissions"
      title={
        <>
          Low spreads starting at <span>0.6 pips</span>
        </>
      }
      text={"Spreads represent the difference between the bid and ask price, directly impacting your trading costs."}
      color="light"
      list={list}
    />
  );
};

export { LowSpreads };
