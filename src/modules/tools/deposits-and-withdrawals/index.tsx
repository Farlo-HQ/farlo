import { HeroSection3 } from "@/components/heroSection3";
import styles from "./styles.module.scss";
import { HowTo } from "./how-to";
import { Perks } from "./perks";
import { FAQS } from "@/components/faqs";
import { FAQData } from "@/components/faqs/accordion";
import { BottomBanner } from "@/components/bottom-banner";

const faqs: FAQData[] = [
  {
    question: "How long do deposits take?",
    answer:
      "Farlo FX is a regulated broker, holding multiple regulatory licenses from several financial authorities across the globe such as the Seychelles Financial Services Authority (FSA), Cyprus Securities and Exchange Commission (CySEC)*, the Financial Conduct Authority (FCA) in the UK*, South Africa Financial Sector Conduct Authority (FSCA), Central Bank of Curacao and Sint Maarten (CBCS), Financial Services Commission (FSC) in the British Virgin Islands, Financial Services Commission (FSC) in Mauritius, Capital Markets Authority (CMA) in Kenya, and the Jordan Securities Commission (JSC).",
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
  {
    question: "What is the best & quickest payment/withdrawal method?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, exercitationem provident minus commodi maiores harum corrupti est obcaecati nesciunt dolorum! Officia culpa quae repellendus facilis dolorem. Inventore dolor architecto maxime.",
  },
];

const DepositsAndWithdrawalsUI = () => {
  return (
    <>
      <HeroSection3
        title={<>Effortless And Secure Transactions</>}
        text={
          "We provide convenient, local, and secure payment methods ensuring a smooth and safe transaction process."
        }
        bgClassName={styles.bg}
        sectionClassName={styles.hero}
        btn1={{ text: "Register", action: console.log }}
        btn2={{ text: "Open Demo", action: console.log }}
      />
      <HowTo />
      <Perks />
      <FAQS title="Frequently asked questions" faqs={faqs} />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { DepositsAndWithdrawalsUI };
