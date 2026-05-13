import { BottomBanner } from "@/components/bottom-banner";
import { HeroSection } from "./heroSection";
import styles from "./styles.module.scss";
import { Posts } from "./posts";

const BlogUI = () => {
  return (
    <>
      <HeroSection />
      <Posts />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: console.log }}
        outlineBtn={{ text: "Open Demo", action: console.log }}
      />
    </>
  );
};

export { BlogUI };
