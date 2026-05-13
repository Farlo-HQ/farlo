import { Section } from "@/components";
import styles from "./styles.module.scss";
import { TimerActiveIcon } from "@/assets/icons/timer";
import { ChartInactiveIcon } from "@/assets/icons/chart";
import { PairInactiveIcon } from "@/assets/icons/trade";

const TradingHours = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <h4 className={styles.ttl}>
        Trading hours, margin requirements, and FX pair types
      </h4>

      <section className={styles.content}>
        <div className={styles.label_container}>
          <div className={`${styles.label} ${styles["label--active"]}`}>
            <TimerActiveIcon /> <p>Trading Hours</p>
          </div>
          <div className={styles.label}>
            <ChartInactiveIcon />
            <p>Margin Requirements</p>
          </div>
          <div className={styles.label}>
            <PairInactiveIcon />
            <p>Forex Pair Types</p>
          </div>
        </div>
        <div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>Trade when the market moves</p>

            <p className={styles.card__txt}>
              With forex running 24/5, you’ll always find opportunities. From
              Sunday 22:05 to Friday 21:59 GMT+0.
              <br />
              <br />
              Certain currency pairs have unique trading hours, ensuring you can
              maximize volatility and price action.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>
              Optimize your trading power with flexible leverage
            </p>

            <p className={styles.card__txt}>
              Margin requirements are directly tied to the leverage you use.
              <br />
              <br />
              Adjust leverage to control your risk and maximize your trading
              potential. Exotic currency pairs maintain fixed margin
              requirements regardless of leverage.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>
              Expand your portfolio with major, minor & exotic pairs
            </p>

            <p className={styles.card__txt}>
              Trade a diverse selection of forex pairs tailored to different
              risk appetites and market conditions.
            </p>
            <ul className={styles.card__list}>
              <li>
                <span>Major Pairs</span>
                <br />
                <span>EURUSD, USDJPY, GBPUSD.</span>
                <br />
                <span>High liquidity, lower spreads.</span>
              </li>
              <li>
                <span>Minor Pairs</span>
                <br />
                <span>AUDCAD, EURGBP</span>
                <br />
                <span>Moderate volatility, strong opportunities.</span>
              </li>
              <li>
                <span>Exotic Pairs</span>
                <br />
                <span>USDZAR, EURTRY</span>
                <br />
                <span> Higher risk, greater reward potential.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Section>
  );
};

export { TradingHours };
