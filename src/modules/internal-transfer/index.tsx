
"use client";
import { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import { useRouter } from "next/navigation";
import {
  IconArrowDown,
  IconWallet,
  IconCircleCheckFilled,
  IconLock,
  IconAlertCircle,
  IconHistory,
  IconBusinessplan,
  IconTrendingUp,
  IconChartBar,
} from "@tabler/icons-react";
import { PiSwap } from "react-icons/pi";
import { CgArrowsExchangeAltV } from "react-icons/cg";

type Step = "form" | "review" | "processing" | "success";
type WalletKey = "main" | "trading" | "investing";

const WALLET_META: Record<WalletKey, { label: string; color: string; icon: React.ReactNode }> = {
  main: { label: "Main Wallet", color: "#CB1A36", icon: <IconBusinessplan size={18} /> },
  trading: { label: "Trading Wallet", color: "#CB1A36", icon: <IconTrendingUp size={18} /> },
  investing: { label: "Investing Wallet", color: "#1a9e75", icon: <IconChartBar size={18} /> },
};

const ALL_WALLETS: WalletKey[] = ["main", "trading", "investing"];
const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

const InternalTransferUI = () => {
  const { wallets, transfer, transactions } = useDashboard();
  const router = useRouter();

  const [step, setStep] = useState<Step>("form");
  const [from, setFrom] = useState<WalletKey>("main");
  const [to, setTo] = useState<WalletKey>("trading");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [pickerOpen, setPickerOpen] = useState<"from" | "to" | null>(null);

  const parsedAmount = parseFloat(amount) || 0;
  const available = wallets[from];

  const toOptions = useMemo(() => ALL_WALLETS.filter((w) => w !== from), [from]);
  const fromOptions = useMemo(() => ALL_WALLETS.filter((w) => w !== to), [to]);

  const handleSelectFrom = (w: WalletKey) => {
    setFrom(w);
    if (w === to) {
      const fallback = ALL_WALLETS.find((x) => x !== w);
      if (fallback) setTo(fallback);
    }
    setPickerOpen(null);
    setAmount("");
    setAmountError("");
  };

  const handleSelectTo = (w: WalletKey) => {
    setTo(w);
    setPickerOpen(null);
  };

  const recentTransfers = transactions.filter((t) => t.type === "transfer_out").slice(0, 5);

  const handleNext = () => {
    if (!amount || parsedAmount <= 0) { setAmountError("Enter an amount to move."); return; }
    if (parsedAmount > available) { setAmountError(`Insufficient balance. Available: $${available.toFixed(2)}`); return; }
    setAmountError("");
    setStep("review");
  };

  const handleConfirm = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 1300));
    const ok = await transfer(from, to, parsedAmount);
    if (!ok) {
      setStep("form");
      setAmountError("Transfer failed. Please try again.");
      return;
    }
    setStep("success");
  };

  const fromMeta = WALLET_META[from];
  const toMeta = WALLET_META[to];

  if (step === "processing") {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.processing_screen}>
          <div className={styles.processing_spinner} />
          <p className={styles.processing_label}>Moving ${parsedAmount.toFixed(2)}…</p>
          <p className={styles.processing_sub}>Please do not close this window.</p>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.container}>
          <div className={styles.success_view}>
            <div className={styles.success_icon}>
              <IconCircleCheckFilled size={52} />
            </div>
            <h1 className={styles.success_title}>Transfer Complete</h1>
            <p className={styles.success_sub}>
              <strong>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> moved from {fromMeta.label} to {toMeta.label}.
            </p>

            <div className={styles.success_receipt}>
              <div className={styles.receipt_row}>
                <span>{fromMeta.label} balance</span>
                <span>${wallets[from].toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>{toMeta.label} balance</span>
                <span>${wallets[to].toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className={styles.success_actions}>
              <button className={styles.btn_primary} onClick={() => router.push("/overview")}>
                Go to Dashboard
              </button>
              <button className={styles.btn_ghost} onClick={() => { setStep("form"); setAmount(""); }}>
                Make Another Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          {step === "review" && (
            <button className={styles.back_btn} onClick={() => setStep("form")}>
              Back
            </button>
          )}
          <div className={styles.header_text}>
            <h1 className={styles.title}>{step === "review" ? "Confirm Transfer" : "Internal Transfer"}</h1>
            <p className={styles.subtitle}>
              {step === "review" ? "Review carefully before confirming." : "Move funds between your wallets instantly, free of charge."}
            </p>
          </div>
        </div>

        {step === "form" && (
          <div className={styles.amount_step}>

            <div className={styles.stack_wrap}>
              <div className={styles.stack_node}>
                <p className={styles.stack_label}>From</p>
                <button
                  className={styles.stack_card}
                  style={{ borderColor: `${fromMeta.color}50` }}
                  onClick={() => setPickerOpen(pickerOpen === "from" ? null : "from")}
                >
                  <span className={styles.stack_icon} style={{ background: `${fromMeta.color}18`, color: fromMeta.color }}>
                    {fromMeta.icon}
                  </span>
                  <span className={styles.stack_info}>
                    <span className={styles.stack_wallet_name}>{fromMeta.label}</span>
                    <span className={styles.stack_wallet_balance}>${wallets[from].toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </span>
                </button>

                {pickerOpen === "from" && (
                  <div className={styles.stack_dropdown}>
                    {fromOptions.map((w) => (
                      <button key={w} className={styles.stack_dropdown_item} onClick={() => handleSelectFrom(w)}>
                        <span style={{ color: WALLET_META[w].color }}>{WALLET_META[w].icon}</span>
                        {WALLET_META[w].label}
                        <span className={styles.stack_dropdown_balance}>${wallets[w].toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.stack_connector}>
                <div className={styles.stack_arrow}><CgArrowsExchangeAltV size={24} /></div>
              </div>

              <div className={styles.stack_node}>
                <p className={styles.stack_label}>To</p>
                <button
                  className={styles.stack_card}
                  style={{ borderColor: `${toMeta.color}50` }}
                  onClick={() => setPickerOpen(pickerOpen === "to" ? null : "to")}
                >
                  <span className={styles.stack_icon} style={{ background: `${toMeta.color}18`, color: toMeta.color }}>
                    {toMeta.icon}
                  </span>
                  <span className={styles.stack_info}>
                    <span className={styles.stack_wallet_name}>{toMeta.label}</span>
                    <span className={styles.stack_wallet_balance}>${wallets[to].toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </span>
                </button>

                {pickerOpen === "to" && (
                  <div className={styles.stack_dropdown}>
                    {toOptions.map((w) => (
                      <button key={w} className={styles.stack_dropdown_item} onClick={() => handleSelectTo(w)}>
                        <span style={{ color: WALLET_META[w].color }}>{WALLET_META[w].icon}</span>
                        {WALLET_META[w].label}
                        <span className={styles.stack_dropdown_balance}>${wallets[w].toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.amount_input_wrap}>
              <span className={styles.currency_symbol}>$</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={styles.amount_input}
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) { setAmount(val); setAmountError(""); }
                }}
              />
              <span className={styles.currency_label}>USD</span>
            </div>

            <div className={styles.quick_grid}>
              {QUICK_AMOUNTS.filter((q) => q <= available).map((q) => (
                <button
                  key={q}
                  className={`${styles.quick_btn} ${amount === String(q) ? styles.quick_active : ""}`}
                  onClick={() => setAmount(String(q))}
                >
                  ${q.toLocaleString()}
                </button>
              ))}

            </div>

            {amountError && (
              <div className={styles.amount_error}>
                <IconAlertCircle size={14} /> {amountError}
              </div>
            )}

            {parsedAmount > 0 && parsedAmount <= available && (
              <div className={styles.amount_summary}>
                <div className={styles.summary_row}>
                  <span>{fromMeta.label} after</span>
                  <span>${(wallets[from] - parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={`${styles.summary_row} ${styles.summary_total}`}>
                  <span>{toMeta.label} after</span>
                  <span>${(wallets[to] + parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            <button className={styles.btn_primary} onClick={handleNext}>
              Continue
            </button>

            {recentTransfers.length > 0 && (
              <div className={styles.recent_section}>
                <div className={styles.recent_header}>
                  <IconHistory size={14} />
                  <span>Recent Transfers</span>
                </div>
                {recentTransfers.map((t) => (
                  <div key={t.id} className={styles.recent_row}>
                    <span className={styles.recent_label}>{t.label}</span>
                    <span className={styles.recent_amount}>${Math.abs(t.amount).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === "review" && (
          <div className={styles.review_step}>
            <div className={styles.stack_wrap}>
              <div className={styles.stack_node}>
                <p className={styles.stack_label}>From</p>
                <div className={styles.stack_card} style={{ borderColor: `${fromMeta.color}50`, cursor: "default" }}>
                  <span className={styles.stack_icon} style={{ background: `${fromMeta.color}18`, color: fromMeta.color }}>{fromMeta.icon}</span>
                  <span className={styles.stack_info}>
                    <span className={styles.stack_wallet_name}>{fromMeta.label}</span>
                  </span>
                </div>
              </div>
              <div className={styles.stack_connector}>
                <div className={styles.stack_arrow}><CgArrowsExchangeAltV
                  size={24} /></div>
              </div>
              <div className={styles.stack_node}>
                <p className={styles.stack_label}>To</p>
                <div className={styles.stack_card} style={{ borderColor: `${toMeta.color}50`, cursor: "default" }}>
                  <span className={styles.stack_icon} style={{ background: `${toMeta.color}18`, color: toMeta.color }}>{toMeta.icon}</span>
                  <span className={styles.stack_info}>
                    <span className={styles.stack_wallet_name}>{toMeta.label}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.review_receipt}>
              <div className={styles.receipt_row}>
                <span>Amount</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>{fromMeta.label} after</span>
                <span>${(wallets[from] - parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>{toMeta.label} after</span>
                <span>${(wallets[to] + parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className={styles.security_note}>
              <IconLock size={13} /> <span>Internal transfers are instant and free</span>
            </div>

            <button className={styles.btn_primary} onClick={handleConfirm}>
              Confirm Transfer
            </button>
            <button className={styles.btn_ghost} onClick={() => setStep("form")}>Edit details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export { InternalTransferUI };