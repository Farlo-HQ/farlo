"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { useDashboard } from "@/context/DashboardContext";
import {
  IconBuildingBank,
  IconCreditCard,
  IconCurrencyBitcoin,
  IconDeviceMobile,
  IconCircleCheck,
  IconChevronRight,
  IconArrowLeft,
  IconLock,
} from "@tabler/icons-react";

type DepositStep = "method" | "amount" | "confirm" | "success";

const PAYMENT_METHODS = [
  {
    id: "bank",
    label: "Bank Transfer",
    sub: "1–3 business days · No fee",
    icon: <IconBuildingBank size={22} strokeWidth={1.5} />,
    color: "blue",
  },
  {
    id: "card",
    label: "Debit / Credit Card",
    sub: "Instant · 1.5% fee",
    icon: <IconCreditCard size={22} strokeWidth={1.5} />,
    color: "red",
  },
  {
    id: "crypto",
    label: "Crypto (USDT / BTC)",
    sub: "15 min · No fee",
    icon: <IconCurrencyBitcoin size={22} strokeWidth={1.5} />,
    color: "amber",
  },
  {
    id: "mobile",
    label: "Mobile Money",
    sub: "Instant · 1% fee",
    icon: <IconDeviceMobile size={22} strokeWidth={1.5} />,
    color: "green",
  },
];

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

const DepositUI = () => {
  const [step, setStep] = useState<DepositStep>("method");
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const { deposit, wallets } = useDashboard();

  const parsedAmount = parseFloat(amount);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount >= 10;

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method);

  const handleConfirm = () => {
    if (isValidAmount) {
      deposit(parsedAmount);
      setStep("success");
    }
  };

  return (
    <div className={styles.container}>
      {step !== "success" && (
        <div className={styles.page_header}>
          {step !== "method" && (
            <button
              className={styles.back_btn}
              onClick={() =>
                setStep(
                  step === "confirm"
                    ? "amount"
                    : step === "amount"
                      ? "method"
                      : "method"
                )
              }
            >
              <IconArrowLeft size={16} /> Back
            </button>
          )}
          <div>
            <h1 className={styles.page_title}>Deposit Funds</h1>
            <p className={styles.page_sub}>
              Add funds to your Main Wallet
            </p>
          </div>
        </div>
      )}

      {step === "method" && (
        <div className={styles.section}>
          <p className={styles.section_label}>Select payment method</p>
          <div className={styles.methods_grid}>
            {PAYMENT_METHODS.map((m) => (
              <div
                key={m.id}
                role="button"
                className={`${styles.method_card} ${method === m.id ? styles.method_card_active : ""
                  }`}
                onClick={() => setMethod(m.id)}
              >
                <div className={`${styles.method_icon} ${styles[`icon_${m.color}`]}`}>
                  {m.icon}
                </div>
                <div className={styles.method_text}>
                  <p className={styles.method_label}>{m.label}</p>
                  <p className={styles.method_sub}>{m.sub}</p>
                </div>
                {method === m.id && (
                  <IconCircleCheck
                    size={20}
                    className={styles.method_check}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.step_actions}>
            <Button
              variant="fill-red"
              disabled={!method}
              onClick={() => setStep("amount")}
            >
              Continue <IconChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {step === "amount" && (
        <div className={styles.section}>
          <div className={styles.selected_method_badge}>
            <div className={`${styles.method_icon_sm} ${styles[`icon_${selectedMethod?.color}`]}`}>
              {selectedMethod?.icon}
            </div>
            {selectedMethod?.label}
          </div>

          <p className={styles.section_label}>Enter amount</p>

          <div className={styles.amount_input_wrap}>
            <span className={styles.currency_symbol}>$</span>
            <input
              type="number"
              className={styles.amount_input}
              placeholder="0.00"
              value={amount}
              min={10}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className={styles.currency_label}>USD</span>
          </div>

          {!isValidAmount && amount !== "" && (
            <p className={styles.amount_error}>Minimum deposit is $10.00</p>
          )}

          <div className={styles.quick_amounts}>
            {QUICK_AMOUNTS.map((q) => (
              <button
                key={q}
                className={`${styles.quick_btn} ${amount === String(q) ? styles.quick_btn_active : ""
                  }`}
                onClick={() => setAmount(String(q))}
              >
                ${q}
              </button>
            ))}
          </div>

          <div className={styles.balance_note}>
            <p>Current Main Wallet Balance</p>
            <p className={styles.balance_val}>
              ${wallets.main.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
            </p>
          </div>

          <div className={styles.step_actions}>
            <Button
              variant="fill-red"
              disabled={!isValidAmount}
              onClick={() => setStep("confirm")}
            >
              Review Deposit <IconChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className={styles.section}>
          <p className={styles.section_label}>Review your deposit</p>

          <div className={styles.confirm_card}>
            <div className={styles.confirm_row}>
              <span className={styles.confirm_label}>Payment Method</span>
              <span className={styles.confirm_value}>{selectedMethod?.label}</span>
            </div>
            <div className={styles.confirm_divider} />
            <div className={styles.confirm_row}>
              <span className={styles.confirm_label}>Deposit Amount</span>
              <span className={styles.confirm_value}>
                ${parsedAmount.toFixed(2)} USD
              </span>
            </div>
            <div className={styles.confirm_row}>
              <span className={styles.confirm_label}>Processing Time</span>
              <span className={styles.confirm_value}>
                {selectedMethod?.sub.split("·")[0].trim()}
              </span>
            </div>
            <div className={styles.confirm_row}>
              <span className={styles.confirm_label}>Fee</span>
              <span className={styles.confirm_value}>
                {selectedMethod?.sub.split("·")[1].trim()}
              </span>
            </div>
            <div className={styles.confirm_divider} />
            <div className={`${styles.confirm_row} ${styles.confirm_total}`}>
              <span>Total to Wallet</span>
              <span>${parsedAmount.toFixed(2)} USD</span>
            </div>
          </div>

          <div className={styles.security_note}>
            <IconLock size={14} />
            <p>
              Your transaction is secured with 256-bit SSL encryption.
            </p>
          </div>

          <div className={styles.step_actions}>
            <Button variant="outline-red" onClick={() => setStep("amount")}>
              Edit
            </Button>
            <Button variant="fill-red" onClick={handleConfirm}>
              Confirm Deposit
            </Button>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className={styles.success}>
          <div className={styles.success_icon}>
            <IconCircleCheck size={52} strokeWidth={1.2} />
          </div>
          <h1 className={styles.success_title}>Deposit Successful!</h1>
          <p className={styles.success_sub}>
            ${parsedAmount.toFixed(2)} USD has been added to your Main
            Wallet.
          </p>
          <div className={styles.success_card}>
            <div className={styles.confirm_row}>
              <span className={styles.confirm_label}>New Balance</span>
              <span className={styles.confirm_value}>
                ${wallets.main.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </span>
            </div>
          </div>
          <div className={styles.success_actions}>
            <Button
              variant="outline-red"
              onClick={() => {
                setStep("method");
                setAmount("");
                setMethod("");
              }}
            >
              Make Another Deposit
            </Button>
            <Button
              variant="fill-red"
              onClick={() => (window.location.href = "/overview")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { DepositUI };