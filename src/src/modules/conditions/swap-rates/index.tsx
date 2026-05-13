import { AlternateList } from "@/components";

const SwapRates = () => {
  const list = [
    {
      title: "Super Low Swap Fees",
      text: "Keep overnight costs at a minimum.",
    },
    {
      title: "Swap-Free Trading on Cryptos",
      text: "Hold BTC, ETH, and other digital assets without overnight charges.",
    },
    {
      title: "Islamic Accounts Available",
      text: "Trade under Sharia-compliant conditions with zero swaps.",
    },
  ];

  return (
    <AlternateList
      tag="Swap Rates"
      title={
        <>
          Hold positions overnight with <span>minimal cost</span>—or none at all
        </>
      }
      text={
        "Swap rates are overnight financing charges, but with FarloFX, you benefit from:"
      }
      color="dark"
      list={list}
    />
  );
};

export { SwapRates };
