import { AlternateList } from "@/components";

const PropTrading = () => {
  const list = [
    {
      title: "Access Larger Capital",
      text: "Trade with funds provided by FarloFX instead of your own capital.",
    },
    {
      title: "Earn a Profit Share",
      text: "Keep a percentage of the profits from successful trades.",
    },
    {
      title: "Scale Your Trading Career",
      text: "Grow your account faster with increased market exposure.",
    },
  ];

  return (
    <AlternateList
      title={<>Prop Trading</>}
      text={
        "Use our funds to trade and maximize your earnings.At FarloFX, we provide skilled traders the opportunity to:"
      }
      color="light"
      list={list}
      btn={{ text: "Apply for Prop Trading", action: console.log }}
    />
  );
};

export { PropTrading };
