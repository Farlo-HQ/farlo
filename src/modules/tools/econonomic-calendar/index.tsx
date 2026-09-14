import { HeroSection3 } from "@/components/heroSection3";
import styles from "./styles.module.scss";
import { BottomBanner } from "@/components/bottom-banner";
import { Events } from "./events";
const EconomicCalendarUI = () => {
  return (
    <>
      <HeroSection3
        title={<>Farlo Economic Calendar</>}
        text={
          "Keep track of high-impact news, key market-moving economic events, and data releases with the Farlo economic calendar."
        }
        btn1={{ text: "Register", action: () => window.open("https://accounts.getfarlo.com/auth/register") }}
        btn2={{ text: "Open Demo", action: () => window.open("https://accounts.getfarlo.com") }}
      />
      <Events />
      <BottomBanner
        title="The Future of Trading Starts Here"
        text="Experience world-class trading conditions, advanced tools, and dedicated support all in one platform."
        fillBtn={{ text: "Register", action: () => window.open("https://accounts.getfarlo.com/auth/register") }}
        outlineBtn={{ text: "Open Demo", action: () => window.open("https://accounts.getfarlo.com") }}
      />
    </>
  );
};

export { EconomicCalendarUI };
