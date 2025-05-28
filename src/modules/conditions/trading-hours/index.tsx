import { AlternateList } from "@/components";

const TradingHours = () => {
  const list = [
    {
      title: "Currencies, Stocks, Indices & Commodities",
      text: "Trade 24/5 to capitalize on global market trends.",
    },
    {
      title: "Cryptocurrencies",
      text: "Trade 24/7, never miss a move in the digital asset space.",
    },
    {
      title: "Flexible Sessions",
      text: "Adapt your strategy to peak trading hours for enhanced profitability.",
    },
  ];

  return (
    <AlternateList
      tag="Trading Hours"
      title={
        <>
          Trade at your convenience with <span>24/5</span> & <span>24/7</span>{" "}
          Access
        </>
      }
      text={"The markets never sleep, and neither do your opportunities."}
      color="light"
      list={list}
    />
  );
};

export { TradingHours };
