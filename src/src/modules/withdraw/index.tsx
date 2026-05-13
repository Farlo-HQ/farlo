

"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import {
  IconBuildingBank,
  IconCurrencyBitcoin,
  IconDeviceMobile,
  IconCheck,
  IconChevronLeft,
  IconCircleCheckFilled
} from "@tabler/icons-react";

type Step = "method" | "amount" | "review" | "success";

const WithdrawalUI = () => {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const resetFlow = () => {
    setStep("method");
    setAmount("");
    setMethod("");
  };

  if (step === "success") {
    return (
      <div className={styles.container}>
        <div className={styles.success_view}>
          <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
            <IconCircleCheckFilled size={64} />
          </div>
          <h1 className={styles.page_title}>Withdrawal Sent</h1>
          <p className={styles.page_subtitle}>
            Your request for <b>${parseFloat(amount).toLocaleString()}</b> has been submitted.
          </p>

          <div className={styles.receipt_wrap} style={{ marginTop: '2rem', textAlign: 'left' }}>
            <div className={styles.receipt_item}>
              <span className={styles.key}>Status</span>
              <span className={styles.val} style={{ color: '#EAB308' }}>Processing</span>
            </div>
            <div className={styles.receipt_item}>
              <span className={styles.key}>Method</span>
              <span className={styles.val}>{method.toUpperCase()}</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button variant="fill-red" fullWidth onClick={() => window.location.href = "/overview"}>
              Return to Dashboard
            </Button>
            <Button variant="ghost-red" fullWidth onClick={resetFlow}>
              Make Another Withdrawal
            </Button>
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
            {step === "method" ? "Where to?" : step === "amount" ? "How much?" : "Confirm"}
          </h1>
          <p className={styles.page_subtitle}>
            {step === "method" && "Select your preferred withdrawal destination."}
            {step === "amount" && "Enter the amount you wish to withdraw."}
            {step === "review" && "Check the details below before confirming."}
          </p>
        </div>

        <div className={styles.main_content}>
          {step === "method" && (
            <div className={styles.selection_list}>
              <span className={styles.label}>Available Methods</span>
              {[
                { id: 'bank', title: 'Bank Account', desc: '1-3 Business Days', icon: <IconBuildingBank size={22} /> },
                { id: 'crypto', title: 'Crypto Wallet', desc: 'Instant Settlement', icon: <IconCurrencyBitcoin size={22} /> },
                { id: 'mobile', title: 'Mobile Money', desc: 'Instant · 1% Fee', icon: <IconDeviceMobile size={22} /> }
              ].map((item) => (
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
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                      setAmount(val);
                    }
                  }}
                  style={{ width: `${Math.max(amount.length * 25, 140)}px` }}
                />
              </div>
              <div className={styles.balance_chip}>
                Available Balance: &nbsp; <span>$12,450.00</span>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className={styles.receipt_wrap}>
              <div className={styles.receipt_item}>
                <span className={styles.key}>Destination</span>
                <span className={styles.val}>{method.toUpperCase()}</span>
              </div>
              <div className={styles.receipt_item}>
                <span className={styles.key}>Fee</span>
                <span className={styles.val}>$0.00</span>
              </div>
              <div className={styles.grand_total}>
                <p className={styles.total_label}>You will receive</p>
                <h2 className={styles.total_value}>
                  ${amount ? parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                </h2>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Button
            variant="fill-red"
            fullWidth
            disabled={step === "method" ? !method : step === "amount" ? (!amount || parseFloat(amount) <= 0) : isLoading}
            onClick={step === "review" ? handleFinalSubmit : handleNext}
          >
            {isLoading ? "Processing..." : step === "review" ? "Confirm Withdrawal" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { WithdrawalUI };