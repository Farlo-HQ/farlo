import { BottomBanner } from "@/components/bottom-banner";
import { LegalDocuments } from "./legal-documents";
import { Licenses } from "./licenses";
import { HeroSection4 } from "@/components/heroSection4";

const LegalUI = () => {
  return (
    <>
      <HeroSection4
        tag="Legal"
        title="Our Legal Documents"
        text="Here is all you need to know about our terms and conditions, our legal structures, and our licenses."
      />
      <LegalDocuments />
      <Licenses />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { LegalUI };
