import { BottomBanner } from "@/components/bottom-banner";
import { HeroSection } from "./heroSection";
import { LegalDocuments } from "./legal-documents";
import { Licenses } from "./licenses";

const LegalUI = () => {
  return (
    <>
      <HeroSection />
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
