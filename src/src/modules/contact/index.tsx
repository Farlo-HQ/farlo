import styles from "./styles.module.scss";
import { BottomBanner } from "@/components/bottom-banner";
import { HeroSection } from "./heroSection";
import { Addresses } from "./addresses";
import { AddressMap } from "./map";
import { Buildings } from "./buildings";
import { Support } from "./support";

const ContactUI = () => {
  return (
    <>
      <HeroSection />
      <Addresses />
      <Support />
      <AddressMap />
      <Buildings />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { ContactUI };
