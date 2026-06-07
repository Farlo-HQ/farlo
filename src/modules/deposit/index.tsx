"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import { supabase } from "@/lib/supabase";
import {
  IconBuildingBank,
  IconCurrencyBitcoin,
  IconDeviceMobile,
  IconCreditCard,
  IconCircleCheckFilled,
  IconLock,
  IconChevronLeft,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconAlertCircle,
} from "@tabler/icons-react";
import { IoArrowForward } from "react-icons/io5";

type Step = "method" | "amount" | "details" | "review" | "processing" | "success";

interface Method {
  id: string;
  title: string;
  tag: string;
  tagType: "instant" | "slow" | "fee";
  desc: string;
  icon: React.ReactNode;
  minDeposit: number;
  fee: number;
  instructions?: string;
}

const METHODS: Method[] = [
  {
    id: "card",
    title: "Debit / Credit Card",
    tag: "Instant",
    tagType: "instant",
    desc: "Visa, Mastercard, Verve",
    icon: <IconCreditCard size={20} strokeWidth={1.6} />,
    minDeposit: 10,
    fee: 1.5,
  },
  {
    id: "bank",
    title: "Bank Transfer",
    tag: "1–3 Business Days",
    tagType: "slow",
    desc: "Wire or local bank transfer",
    icon: <IconBuildingBank size={20} strokeWidth={1.6} />,
    minDeposit: 50,
    fee: 0,
    instructions: "Send to: Farlo Markets Ltd · Sort: 04-00-75 · Acc: 12345678 · Ref: your email",
  },
  {
    id: "crypto",
    title: "Crypto Wallet",
    tag: "Instant",
    tagType: "instant",
    desc: "BTC, ETH, USDT supported",
    icon: <IconCurrencyBitcoin size={20} strokeWidth={1.6} />,
    minDeposit: 20,
    fee: 0,
    instructions: "USDT (TRC20): TQnEe...k9Xp · BTC: bc1q...rw3z · ETH: 0x4f...a91c",
  },
  {
    id: "mobile",
    title: "Mobile Money",
    tag: "Instant · 1% fee",
    tagType: "fee",
    desc: "M-Pesa, MTN, Airtel Money",
    icon: <IconDeviceMobile size={20} strokeWidth={1.6} />,
    minDeposit: 5,
    fee: 1,
  },
];

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000, 2500];

interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

const DepositUI = () => {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<Method | null>(null);
  const [amount, setAmount] = useState("");
  const [cardDetails, setCardDetails] = useState<CardDetails>({ number: "", name: "", expiry: "", cvv: "" });
  const [cardErrors, setCardErrors] = useState<Partial<CardDetails>>({});
  const [copied, setCopied] = useState(false);
  const [amountError, setAmountError] = useState("");

  const { deposit, wallets, userProfile } = useDashboard();

  const parsedAmount = parseFloat(amount) || 0;
  const fee = method ? (parsedAmount * method.fee) / 100 : 0;
  const total = parsedAmount - fee;

  const goBack = () => {
    if (step === "amount") setStep("method");
    else if (step === "details") setStep("amount");
    else if (step === "review") setStep(method?.id === "card" ? "details" : "amount");
  };

  const handleMethodSelect = (m: Method) => {
    setMethod(m);
    setStep("amount");
  };

  const handleAmountNext = () => {
    if (!amount || parsedAmount <= 0) { setAmountError("Please enter an amount."); return; }
    if (method && parsedAmount < method.minDeposit) {
      setAmountError(`Minimum deposit is $${method.minDeposit}.`);
      return;
    }
    setAmountError("");
    if (method?.id === "card") setStep("details");
    else setStep("review");
  };

  const validateCard = () => {
    const errors: Partial<CardDetails> = {};
    if (!cardDetails.number.replace(/\s/g, "") || cardDetails.number.replace(/\s/g, "").length < 16) errors.number = "Invalid card number";
    if (!cardDetails.name.trim()) errors.name = "Required";
    if (!cardDetails.expiry || cardDetails.expiry.length < 5) errors.expiry = "Invalid expiry";
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) errors.cvv = "Invalid CVV";
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDetailsNext = () => {
    if (validateCard()) setStep("review");
  };

  const handleConfirm = async () => {
    setStep("processing");

    await new Promise((r) => setTimeout(r, 2200));

    deposit(parsedAmount);

    if (userProfile?.id) {
      await supabase.from("transactions").insert({
        user_id: userProfile.id,
        type: "deposit",
        wallet: "main",
        label: `Deposit via ${method?.title}`,
        amount: parsedAmount,
        date: new Date().toISOString(),
        status: "completed",
      });

      const { data: wallet } = await supabase
        .from("wallets")
        .select("main_balance")
        .eq("user_id", userProfile.id)
        .single();

      if (wallet) {
        await supabase
          .from("wallets")
          .update({ main_balance: wallet.main_balance + parsedAmount, updated_at: new Date().toISOString() })
          .eq("user_id", userProfile.id);
      }
    }

    setStep("success");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const stepIndex = ["method", "amount", "details", "review"].indexOf(step);

  if (step === "processing") {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.processing_screen}>
          <div className={styles.processing_spinner} />
          <p className={styles.processing_label}>Processing your deposit…</p>
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
            <h1 className={styles.success_title}>Deposit Confirmed</h1>
            <p className={styles.success_sub}>
              <strong>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> has been credited to your Main Wallet.
            </p>

            <div className={styles.success_receipt}>
              <div className={styles.receipt_row}>
                <span>Method</span>
                <span>{method?.title}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>Amount</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>Fee</span>
                <span>{fee > 0 ? `-$${fee.toFixed(2)}` : "None"}</span>
              </div>
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>Credited</span>
                <span>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className={styles.success_balance}>
              Main Wallet balance: <strong>${(wallets.main).toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
            </div>

            <div className={styles.success_actions}>
              <button className={styles.btn_primary} onClick={() => window.location.href = "/overview"}>
                Go to Dashboard
              </button>
              <button className={styles.btn_ghost} onClick={() => {
                setStep("method");
                setMethod(null);
                setAmount("");
                setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
              }}>
                Make Another Deposit
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
          {step !== "method" && (
            <button className={styles.back_btn} onClick={goBack}>
              <IconChevronLeft size={16} /> Back
            </button>
          )}
          <div className={styles.header_text}>
            <h1 className={styles.title}>
              {step === "method" && "Deposit Funds"}
              {step === "amount" && `Deposit via ${method?.title}`}
              {step === "details" && "Card Details"}
              {step === "review" && "Confirm Deposit"}
            </h1>
            <p className={styles.subtitle}>
              {step === "method" && "Choose how you'd like to fund your account."}
              {step === "amount" && `Minimum deposit: $${method?.minDeposit}. ${method?.fee ? `${method.fee}% fee applies.` : "No fees."}`}
              {step === "details" && "Your card details are encrypted and never stored."}
              {step === "review" && "Review carefully before confirming."}
            </p>
          </div>


        </div>

        {step === "method" && (
          <div className={styles.methods}>
            {METHODS.map((m) => (
              <button key={m.id} className={styles.method_card} onClick={() => handleMethodSelect(m)}>
                <div className={styles.method_icon}>{m.icon}</div>
                <div className={styles.method_info}>
                  <p className={styles.method_title}>{m.title}</p>
                  <p className={styles.method_desc}>{m.desc}</p>
                </div>
                <span className={`${styles.method_tag} ${styles[`tag_${m.tagType}`]}`}>{m.tag}</span>
                <IconArrowRight size={16} className={styles.method_arrow} strokeWidth={1.8} />
              </button>
            ))}

            <div className={styles.security_note}>
              <IconLock size={13} strokeWidth={1.8} />
              <span>All transactions are secured with 256-bit SSL encryption</span>
            </div>
          </div>
        )}

        {step === "amount" && (
          <div className={styles.amount_step}>
            <div className={styles.amount_input_wrap}>
              <span className={styles.currency_symbol}>$</span>
              <input
                autoFocus
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={styles.amount_input}
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setAmount(val);
                    setAmountError("");
                  }
                }}
              />
              <span className={styles.currency_label}>USD</span>
            </div>

            {amountError && (
              <div className={styles.amount_error}>
                <IconAlertCircle size={14} /> {amountError}
              </div>
            )}

            <div className={styles.quick_grid}>
              {QUICK_AMOUNTS.map((q) => (
                <button
                  key={q}
                  className={`${styles.quick_btn} ${amount === String(q) ? styles.quick_active : ""}`}
                  onClick={() => { setAmount(String(q)); setAmountError(""); }}
                >
                  ${q.toLocaleString()}
                </button>
              ))}
            </div>

            {parsedAmount > 0 && method && (
              <div className={styles.amount_summary}>
                <div className={styles.summary_row}>
                  <span>Amount</span>
                  <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                {fee > 0 && (
                  <div className={styles.summary_row}>
                    <span>Fee ({method.fee}%)</span>
                    <span>-${fee.toFixed(2)}</span>
                  </div>
                )}
                <div className={`${styles.summary_row} ${styles.summary_total}`}>
                  <span>Total</span>
                  <span>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            {method?.instructions && (
              <div className={styles.instructions_box}>
                <p className={styles.instructions_label}>Transfer details</p>
                <p className={styles.instructions_text}>{method.instructions}</p>
                <button className={styles.copy_btn} onClick={() => handleCopy(method.instructions!)}>
                  {copied ? <><IconCheck size={13} /> Copied</> : <><IconCopy size={13} /> Copy details</>}
                </button>
              </div>
            )}

            <button
              className={styles.btn_primary}
              disabled={!amount || parsedAmount <= 0}
              onClick={handleAmountNext}
            >
              Continue <IoArrowForward size={16} />
            </button>
          </div>
        )}

        {step === "details" && (
          <div className={styles.card_step}>
            <div className={styles.card_preview}>
              <div className={styles.card_chip} />
              <p className={styles.card_preview_number}>
                {cardDetails.number || "•••• •••• •••• ••••"}
              </p>
              <div className={styles.card_preview_bottom}>
                <span>{cardDetails.name || "CARDHOLDER NAME"}</span>
                <span>{cardDetails.expiry || "MM/YY"}</span>
              </div>
            </div>

            <div className={styles.card_fields}>
              <div className={styles.field_group}>
                <label>Card Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  maxLength={19}
                  onChange={(e) => setCardDetails(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                  className={cardErrors.number ? styles.field_error : ""}
                />
                {cardErrors.number && <span className={styles.field_err_msg}>{cardErrors.number}</span>}
              </div>

              <div className={styles.field_group}>
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="As it appears on card"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                  className={cardErrors.name ? styles.field_error : ""}
                />
                {cardErrors.name && <span className={styles.field_err_msg}>{cardErrors.name}</span>}
              </div>

              <div className={styles.field_row}>
                <div className={styles.field_group}>
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    maxLength={5}
                    onChange={(e) => setCardDetails(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    className={cardErrors.expiry ? styles.field_error : ""}
                  />
                  {cardErrors.expiry && <span className={styles.field_err_msg}>{cardErrors.expiry}</span>}
                </div>
                <div className={styles.field_group}>
                  <label>CVV</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="•••"
                    value={cardDetails.cvv}
                    maxLength={4}
                    onChange={(e) => setCardDetails(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))}
                    className={cardErrors.cvv ? styles.field_error : ""}
                  />
                  {cardErrors.cvv && <span className={styles.field_err_msg}>{cardErrors.cvv}</span>}
                </div>
              </div>
            </div>

            <div className={styles.security_note}>
              <IconLock size={13} /> <span>Card details are encrypted and never stored on our servers.</span>
            </div>

            <button className={styles.btn_primary} onClick={handleDetailsNext}>
              Review Deposit <IconArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "review" && (
          <div className={styles.review_step}>
            <div className={styles.review_method}>
              <div className={styles.review_method_icon}>{method?.icon}</div>
              <div>
                <p className={styles.review_method_name}>{method?.title}</p>
                <p className={styles.review_method_tag}>{method?.tag}</p>
              </div>
            </div>

            <div className={styles.review_receipt}>
              <div className={styles.receipt_row}>
                <span>Deposit amount</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              {fee > 0 && (
                <div className={styles.receipt_row}>
                  <span>Processing fee ({method?.fee}%)</span>
                  <span>-${fee.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.receipt_row}>
                <span>Destination</span>
                <span>Main Wallet</span>
              </div>
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>Total credited</span>
                <span>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {method?.id === "card" && (
              <div className={styles.review_card_preview}>
                <IconCreditCard size={16} strokeWidth={1.6} />
                <span>
                  {cardDetails.number ? `•••• ${cardDetails.number.replace(/\s/g, "").slice(-4)}` : "Card on file"}
                  &nbsp;·&nbsp;{cardDetails.name || "Cardholder"}
                </span>
              </div>
            )}

            <div className={styles.security_note}>
              <IconLock size={13} /> <span>Secured with 256-bit SSL encryption</span>
            </div>

            <button className={styles.btn_primary} onClick={handleConfirm}>
              Confirm Deposit <IconArrowRight size={16} />
            </button>
            <button className={styles.btn_ghost} onClick={goBack}>Edit details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export { DepositUI };