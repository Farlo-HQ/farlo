import { AlternateList } from "@/components";

const TradingAdvantages = () => {
  const list = [
    {
      title: "Live Quotes & Real-Time Market Data",
      text: "Stay ahead with accurate price feeds.",
    },
    {
      title: "Advanced Trading Platforms",
      text: "Access MT5, featuring top-tier charting and automation tools.",
    },
    {
      title: "Comprehensive Educational Resources",
      text: "eBooks, webinars, and expert insights to sharpen your skills.",
    },
    {
      title: "Dedicated Customer Support",
      text: "24/5 multilingual assistance to support your trading journey.",
    },
  ];

  return (
    <AlternateList
      tag="Trading Advantages"
      title={
        <>
          Live quotes, advanced charting & pro-level tools
        </>
      }
      text={"Precision execution, real-time data, and superior analytics—trade like a pro."}
      color="light"
      list={list}
    />
  );
};

export { TradingAdvantages };
