import { AlternateList } from "@/components";

const MarginAndLeverage = () => {
  const list = [
    {
      title: "Flexible Leverage Options",
      text: "Choose leverage up to 1:1000 to suit your trading strategy.",
    },
    {
      title: "Lower Margin Requirements",
      text: "Open positions with a fraction of the full trade value",
    },
    {
      title: "Advanced Risk Management",
      text: "Protect your capital with built-in safeguards.",
    },
  ];

  return (
    <AlternateList
      tag="Margin and Leverage"
      title={
        <>
          Amplify your trading potential with up to <span>1:1000</span> leverage{" "}
        </>
      }
      text={
        "Margin is the required capital to open a leveraged position, while leverage magnifies both profits and risks."
      }
      color="dark"
      list={list}
    />
  );
};

export { MarginAndLeverage };
