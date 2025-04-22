import styles from "./styles.module.scss";
import { IconCaretDownFilled } from "@tabler/icons-react";

const Rates = () => {
  const rates = [
    {
      title: "Gold",
      value: 200.63,
      rate: 0.5,
    },
    {
      title: "Silver",
      value: 200,
      rate: -0.5,
    },
    {
      title: "Mercury",
      value: 200,
      rate: -0.5,
    },
    {
      title: "Gold",
      value: 200.63,
      rate: -0.5,
    },
    {
      title: "Mercury",
      value: 200,
      rate: -0.5,
    },
    {
      title: "Gold",
      value: 200.63,
      rate: -0.5,
    },
  ];
  return (
    <section className={styles.bg}>
      <div className={styles.rates}>
        {rates.map(({ title, value, rate }) => (
          <p className={styles.rate}>
            <span className={styles.rate__ttl}>{title}</span>
            <span className={styles.rate__value}>{value}</span>
            <span
              className={`${styles.rate__rate} ${
                rate > 0
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
