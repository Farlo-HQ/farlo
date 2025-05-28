import { AlternateList } from "@/components";

const LowLatency = () => {
  const list = [
    {
      title: "Lightning-Fast Trade Execution",
      text: "No delays, no slippage, just precision trading.",
    },
    {
      title: "Ultra-Low Latency",
      text: "Orders filled in under 30ms, ensuring minimal market impact.",
    },
    {
      title: "Institutional-Grade Trading Infrastructure",
      text: "Stability and efficiency at every level.",
    },
  ];

  return (
    <AlternateList
      tag="Low Latency"
      title={<>Execution speeds as low as 30 milliseconds </>}
      text={"Speed matters, especially in fast-moving markets."}
      color="dark"
      list={list}
    />
  );
};

export { LowLatency };
