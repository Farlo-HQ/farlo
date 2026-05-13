import { BottomBanner } from "@/components/bottom-banner";
import { Body } from "./body";
import { HeroSection4 } from "@/components/heroSection4";

const TermsOfUseUI = () => {
  return (
    <>
      <HeroSection4
        title="Terms of Use"
        text="Here is all you need to know about our terms and conditions, our legal structures, and our licenses."
      />
      <Body />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { TermsOfUseUI };
