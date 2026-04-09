"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { useDashboard } from "@/context/DashboardContext";
import {
  IconBuildingBank,
  IconCurrencyBitcoin,
  IconDeviceMobile,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheckFilled,
  IconCreditCard,
  IconLock
} from "@tabler/icons-react";

type Step = "method" | "amount" | "review" | "success";

const METHODS = [
  { id: 'bank', title: 'Bank Transfer', desc: '1-3 Business Days', icon: <IconBuildingBank size={22} /> },
  { id: 'crypto', title: 'Crypto Wallet', desc: 'Instant Settlement', icon: <IconCurrencyBitcoin size={22} /> },
  { id: 'mobile', title: 'Mobile Money', desc: 'Instant · 1% Fee', icon: <IconDeviceMobile size={22} /> },
  { id: "card", title: "Debit / Credit Card", desc: "Instant · 1.5% fee", icon: <IconCreditCard size={22} strokeWidth={1.5} /> },
];

const QUICK_AMOUNTS = ["50", "100", "250", "500", "1000", "2000"];

const DepositUI = () => {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const activeMethod = METHODS.find(m => m.id === method);
  const { wallets } = useDashboard();

  const handleNext = () => {
    if (step === "method") setStep("amount");
    else if (step === "amount") setStep("review");
  };

  const handleFinalSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1500);
  };

  if (step === "success") {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.container}>
          <div className={styles.success_view}>
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
              <IconCircleCheckFilled size={64} />
            </div>
            <h1 className={styles.page_title}>Deposit Successful</h1>
            <p className={styles.page_subtitle}>
              Your deposit of <b>${parseFloat(amount).toLocaleString()}</b> has been credited to your Main Wallet.
            </p>
            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="fill-red" fullWidth onClick={() => window.location.href = "/overview"}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        <div className={styles.page_header}>
          {step !== "method" && (
            <IconChevronLeft
              className={styles.back_btn}
              size={24}
              onClick={() => setStep(step === "review" ? "amount" : "method")}
            />
          )}
          <h1 className={styles.page_title}>
            {step === "method" ? "Deposit Funds" : step === "amount" ? "How much?" : "Confirm"}
          </h1>
          <p className={styles.page_subtitle}>
            {step === "method" && "Select your preferred payment method."}
            {step === "amount" && "Enter the amount you wish to add."}
            {step === "review" && "Check the details below before confirming."}
          </p>
        </div>

        <div className={styles.main_content}>
          {step === "method" && (
            <div className={styles.selection_list}>
              <span className={styles.label}>Available Methods</span>
              {METHODS.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.selection_row} ${method === item.id ? styles.active : ""}`}
                  onClick={() => setMethod(item.id)}
                >
                  <div className={styles.icon_box}>{item.icon}</div>
                  <div className={styles.content}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.desc}>{item.desc}</p>
                  </div>
                  {method === item.id && <IconCheck size={20} color="var(--primary)" />}
                </div>
              ))}
            </div>
          )}

          {step === "amount" && (
            <div className={styles.amount_stage}>
              <div className={styles.method_badge}>
                <div className={styles.badge_icon}>{activeMethod?.icon}</div>
                <span>{activeMethod?.title}</span>
              </div>
              <div className={styles.input_container}>
                <span>$</span>
                <input
                  autoFocus
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) setAmount(val);
                  }}
                  style={{ width: `${Math.max(amount.length * 25, 140)}px` }}
                />
              </div>
              <div className={styles.balance_chip}>
                Main Wallet: &nbsp; <span>${wallets.main.toLocaleString()}</span>
              </div>

              <div className={styles.quick_amounts}>
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q}
                    className={`${styles.q_btn} ${amount === q ? styles.q_active : ""}`}
                    onClick={() => setAmount(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>


            </div>
          )}

          {/* {step === "review" && (
            <div className={styles.receipt_wrap}>
              <div className={styles.receipt_item}>
                <span className={styles.key}>Payment Method</span>
                <span className={styles.val}>{method.toUpperCase()}</span>
              </div>
              <div className={styles.receipt_item}>
                <span className={styles.key}>Fee</span>
                <span className={styles.val}>$0.00</span>
              </div>
              <div className={styles.grand_total}>
                <p className={styles.total_label}>Total to Deposit</p>
                <h2 className={styles.total_value}>
                  ${amount ? parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                </h2>
              </div>
              <div className={styles.lock_note}>
                <IconLock size={14} />
                <p>Your transaction is secured with 256-bit SSL encryption.</p>
              </div>
            </div>
          )} */}

          {step === "review" && (
            <div className={styles.step_content}>
              <span className={styles.section_tag}>Review Your Deposit</span>

              <div className={styles.receipt_wrap}>
                <div className={styles.receipt_item}>
                  <span className={styles.key}>Payment Method</span>
                  <span className={styles.val}>{activeMethod?.title}</span>
                </div>
                <div className={styles.receipt_item}>
                  <span className={styles.key}>Deposit Amount</span>
                  <span className={styles.val}>${amount ? parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}</span>
                </div>
                <div className={styles.receipt_item}>
                  <span className={styles.key}>Processing Time</span>
                  <span className={styles.val}>{activeMethod?.desc}</span>
                </div>
                <div className={styles.receipt_item}>
                  <span className={styles.key}>Fee</span>
                  <span className={styles.val}>No fee</span>
                </div>
                <div className={`${styles.receipt_item} ${styles.total_row}`}>
                  <span className={styles.key}>Total to Wallet</span>
                  <span className={styles.total_val}>${amount ? parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}</span>
                </div>
              </div>

              <div className={styles.lock_note}>
                <IconLock size={14} color="green" />
                <p>Your transaction is secured with 256-bit SSL encryption.</p>
              </div>

              <div className={styles.action_split}>
                <Button variant="outline-red" onClick={() => setStep("amount")}>Edit</Button>
                <Button variant="fill-red" onClick={handleFinalSubmit}>{isLoading ? "Processing..." : "Confirm Deposit"}</Button>
              </div>
            </div>
          )}
        </div>

        {step !== "review" && (
          <div style={{ marginTop: '3rem' }}>
            <Button
              variant="fill-red"
              fullWidth
              disabled={
                step === "method"
                  ? !method
                  : step === "amount"
                    ? (!amount || parseFloat(amount) <= 0)
                    : isLoading
              }
              onClick={handleNext}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { DepositUI };