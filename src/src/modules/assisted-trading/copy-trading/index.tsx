import { AlternateList } from "@/components";

const CopyTrading = () => {
  const list = [
    {
      title: "Beginners",
      text: "Get exposure to expert-level strategies without years of experience.",
    },
    {
      title: "Hands-Off Traders",
      text: "Let professionals handle trade execution while you focus on results.",
    },
    {
      title: "Time-Conscious Investors",
      text: "Save time by leveraging the expertise of high-performing traders.",
    },
  ];

  return (
    <AlternateList
      title={<>Copy Trading</>}
      text={
        "Follow seasoned traders and replicate their success with zero effort. This feature is perfect for:"
      }
      color="light"
      list={list}
      btn={{ text: "Start Copy Trading", action: console.log }}
    />
  );
};

export { CopyTrading };
