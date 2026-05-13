import styles from "./styles.module.scss";
import { IconCaretDownFilled } from "@tabler/icons-react";

const Rates = () => {
  const rates = [
    {
      title: "EUR/USD",
      value: 1.0842,
      rate: 0.21,
    },
    {
      title: "GBP/USD",
      value: 1.2635,
      rate: +0.14,
    },
    {
      title: "BTC/USD",
      value: 67.420,
      rate: +1.42,
    },
    {
      title: "Gold",
      value: 2316.80,
      rate: +0.72,
    },
    {
      title: "AAPL",
      value: 191.20,
      rate: +0.84,
    },
    {
      title: "NVDA",
      value: 878.40,
      rate: +2.31,
    },
    {
      title: "SPY",
      value: 512.10,
      rate: +0.28,
    },
    {
      title: "US30",
      value: 38.450,
      rate: +0.32,
    },
    {
      title: "ETH/USD",
      value: 3.480,
      rate: +0.88,
    },
  ];
  return (
    <section className={styles.bg}>
      <div className={styles.rates}>
        {rates.map(({ title, value, rate }, index) => (
          <p key={`rate-${index}`} className={styles.rate}>
            <span className={styles.rate__ttl}>{title}</span>
            <span className={styles.rate__value}>{value}</span>
            <span
              className={`${styles.rate__rate} ${rate > 0
                ? styles["rate__rate--increase"]
                : styles["rate__rate--decrease"]
                }`}
            >
              <IconCaretDownFilled size={20} /> {rate}%
            </span>
          </p>
        ))}
      </div>
    </section>
  );
};

export { Rates };
