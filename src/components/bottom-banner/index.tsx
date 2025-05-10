import { ArrowRight } from "@/assets/icons/arrow-right";
import { Button } from "../button";
import { Section } from "../section";
import styles from "./styles.module.scss";
import { LogoIconBlack } from "@/assets/vectors";

interface BottomBannerProps {
  title?: string;
  text?: string;
  fillBtn?: { text: string; action: () => void };
  outlineBtn?: { text: string; action: () => void };
}

const BottomBanner = ({
  text,
  title,
  fillBtn,
  outlineBtn,
}: BottomBannerProps) => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <LogoIconBlack />
      <div>
        <p className={styles.ttl}>
          {title ?? "Take the first step toward smarter trading"}
        </p>
        <p className={styles.txt}>
          {text ??
            "Join a trading community that prioritizes speed, security, and strategy."}
        </p>
      </div>
      <div className={styles.ctas}>
        {!fillBtn && !outlineBtn ? (
          <Button variant="fill-white">
            Open Account <ArrowRight />
          </Button>
        ) : null}
        {fillBtn ? (
          <Button onClick={fillBtn.action} variant="fill-white">
            {fillBtn.text} <ArrowRight />
          </Button>
        ) : null}
        {outlineBtn ? (
          <Button onClick={outlineBtn.action} variant="outline-white">
            {outlineBtn.text} <ArrowRight />
          </Button>
        ) : null}
      </div>
    </Section>
  );
};

export { BottomBanner };
