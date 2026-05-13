import { Section } from "@/components";
import styles from "./styles.module.scss";

const MarketDive = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <section className={styles.content}>
        <h3 className={styles.ttl}>
          Navigate The Stock Market With Confidence{" "}
        </h3>
        <div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>
              Market timing matters, trade smarter with FarloFX.
            </p>

            <p className={styles.card__txt}>
              Whether you’re trading on earnings reports, macroeconomic news, or
              technical signals, FarloFX equips you with the tools needed to
              capitalize on market movements, whether prices are rising or
              falling
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.card__ttl}>Stay ahead of market trends</p>

            <ul className={styles.card__list}>
              <li>
                <span>Trading Hours:</span>
                <br />
                <span>Monday to Friday, 14:40 - 20:45 GMT+0 </span>
              </li>
              <li>
                <span> Pre-Market Trading</span>
                <br />
                <span>
                  11:00 - 14:40 GMT+0 (for select stocks like INTC, BAC, TSLA)
                </span>
              </li>
            </ul>
            <p style={{ marginTop: "1rem" }} className={styles.card__txt}>
              During pre-market hours, only closing orders are allowed, no new
              positions can be opened.
            </p>
          </div>
        </div>
      </section>
    </Section>
  );
};

export { MarketDive };
