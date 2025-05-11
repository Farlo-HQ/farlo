import { Section } from "@/components";
import styles from "./styles.module.scss";

const MarketDive = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <section className={styles.content}>
        <h3 className={styles.ttl}>
          A New Era Of Trading Powered By The Blockchain
        </h3>
        <div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>
              Secure, transparent, and highly liquid. Crypto is reshaping
              financial markets
            </p>

            <p className={styles.card__txt}>
              Cryptocurrencies operate on decentralized blockchain networks,
              offering secure and transparent transactions without the need for
              intermediaries.
              <br />
              <br />
              With FarloFX, you can explore the potential of digital assets and
              enhance your trading strategy.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>
              Trade crypto on your terms, with 24/7 access
            </p>

            <ul className={styles.card__list}>
              <li>
                <span>BTCAUD, BTCJPY, BTCCNH, BTCTHB, BTCZAR</span>
                <br />
                <span>Sunday from 21:35 to 22:05 </span>
              </li>
              <li>
                <span> BTCXAU, BTCXAG</span>
                <br />
                <span>Monday to Thursday from 21:58 to 23:01</span>
              </li>
             
            </ul>
            <p style={{ marginTop: "1rem" }} className={styles.card__txt}>All times are in server time (GMT+0).</p>
          </div>
        </div>
      </section>
    </Section>
  );
};

export { MarketDive };
