"use client";

import styles from "./styles.module.scss";

const tickerItems = [
  { symbol: "EUR/USD", price: "1.0842", change: "+0.21%" },
  { symbol: "GBP/USD", price: "1.2635", change: "+0.14%" },
  { symbol: "GOLD", price: "2316.80", change: "+0.72%" },
  { symbol: "BTC/USD", price: "67,420", change: "+1.42%" },
  { symbol: "AAPL", price: "191.20", change: "+0.84%" },
  { symbol: "NVDA", price: "878.40", change: "+2.31%" },
  { symbol: "SPY", price: "512.10", change: "+0.28%" },
  { symbol: "US30", price: "38,450", change: "+0.32%" },
  { symbol: "ETH/USD", price: "3,480", change: "+0.88%" },
];

const TickerStrip = () => {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className={styles.ticker}>
      <div className={styles.ticker__track}>
        {doubled.map((item, i) => (
          <div key={i} className={styles.ticker__item}>
            <span className={styles.ticker__symbol}>{item.symbol}</span>
            <span className={styles.ticker__price}>{item.price}</span>
            <span className={`${styles.ticker__change} ${styles["ticker__change--up"]}`}>
              {item.change}
            </span>
            <span className={styles.ticker__dot} aria-hidden>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TickerStrip };
