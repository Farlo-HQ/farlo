import { Section } from "@/components";
import styles from "./styles.module.scss";
import { TimerActiveIcon } from "@/assets/icons/timer";
import { ChartInactiveIcon } from "@/assets/icons/chart";
import { PairInactiveIcon } from "@/assets/icons/trade";

const MarketDive = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <section className={styles.content}>
        <h3 className={styles.ttl}>Trade When The Market Is Most Active</h3>
        <div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>
              Trade without owning a single stock
            </p>

            <p className={styles.card__txt}>
              With FarloFX, you can trade index CFDs, allowing you to speculate
              on market movements without owning the underlying assets. Utilize
              leverage to control larger positions and seize opportunities in
              dynamic market conditions.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>Follow structured trading hours.</p>

            <ul className={styles.card__list}>
              <li>
                <span>NASDAQ 100 / S&P 500 / Dow Jones (US30):</span>
                <br />
                <span>
                  Monday to Friday, 23:00 – 09:15 & 09:30 – 22:00 (UTC)
                </span>
              </li>
              <li>
                <span> AUS200 (Australia S&P ASX 200):</span>
                <br />
                <span>
                  Sunday 23:05 – Friday 21:00 (Daily break: 05:30-06:10,
                  21:59-23:05 UTC)
                </span>
              </li>
              <li>
                <span>FTSE 100 / EU Stocks 50 / Nikkei 225 / France 40:</span>
                <br />
                <span>
                  Sunday 23:05 – Friday 21:00 (Daily break: 21:59-23:05 UTC)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Section>
  );
};

export { MarketDive };
