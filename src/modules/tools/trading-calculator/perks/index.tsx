import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import { Select } from "@/components/select";
import { Input } from "@/components/input";

const Perks = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div className={styles.sec1}>
        <p className={styles.tag}>Perks</p>
        <h3 className={styles.ttl}>Eliminate Guesswork, Use The Calculator</h3>
        <div className={styles.ctas}>
          <Button>
            Setup Live <ArrowRight />
          </Button>
          <Button variant="grey">
            Deposit <ArrowRight />
          </Button>
        </div>
      </div>
      <TradingCalculator />
    </Section>
  );
};

const TradingCalculator = () => {
  const accountTypes = [
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium" },
    { value: "vip", label: "VIP" },
  ];
  const accountCurrencies = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "gbp", label: "GBP" },
  ];
  const instruments = [
    { value: "eurusd", label: "EUR/USD" },
    { value: "usdjpy", label: "USD/JPY" },
    { value: "gbpusd", label: "GBP/USD" },
  ];
  const leverages = [
    { value: "1:50", label: "1:50" },
    { value: "1:100", label: "1:100" },
    { value: "1:200", label: "1:200" },
    { value: "1:500", label: "1:500" },
  ];

  return (
    <section className={styles.calculator}>
      <div className={styles.calculator__form}>
        <p className={styles.calculator__form__ttl}>Your Order</p>
        <form>
          <Select label="Account type" options={accountTypes} />
          <Select label="Account currency" options={accountCurrencies} />
          <Select label="Instrument" options={instruments} />
          <Input label="Lot" placeholder="enter lot size" styleType="style2" />
          <Select label="Leverage" options={leverages} />
          <Button>Calculate</Button>
        </form>
      </div>

      <div className={styles.calculator__results_container}>
        <div className={styles.calculator__results}>
          <p className={styles.calculator__results__ttl}>Results</p>
          <div className={styles.calculator__results__item}>
            <p>Margin</p> <p>14.58 USD</p>
          </div>
          <div className={styles.calculator__results__item}>
            <p>
              Spread cost<sup>1</sup>
            </p>
            <p>0.16 USD</p>
          </div>
          <div className={styles.calculator__results__item}>
            <p>Commission</p>
            <p>0 USD</p>
          </div>
          <div className={styles.calculator__results__item}>
            <p>Swap short</p>
            <p>0 USD</p>
          </div>
          <div className={styles.calculator__results__item}>
            <p>Swap long</p>
            <p>−0.34 USD</p>
          </div>
          <div className={styles.calculator__results__item}>
            <p>Pip value </p>
            <p>0.010000 USD</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Perks };
