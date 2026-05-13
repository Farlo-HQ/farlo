import { AlternateList } from "@/components";

const SocialTrading = () => {
  const list = [
    {
      title: "Learn from Others",
      text: "Engage with professional traders and discuss market trends.",
    },
    {
      title: "Follow & Copy Strategies",
      text: "Track high-performing traders and integrate their insights.",
    },
    {
      title: "Stay Updated in Real-Time",
      text: "Keep up with the latest strategies and economic events through a dynamic community.",
    },
  ];

  return (
    <AlternateList
      title={<>Social Trading</>}
      text={
        "Get real-time insights, market trends, and strategies from top traders. With FarloFX Social Trading you can:"
      }
      color="dark"
      list={list}
      btn={{ text: "Join the Trading Community", action: console.log }}
    />
  );
};

export { SocialTrading };
