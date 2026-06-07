
"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import {
  IconBuildingBank,
  IconCurrencyBitcoin,
  IconDeviceMobile,
  IconCircleCheckFilled,
  IconLock,
  IconChevronLeft,
  IconArrowRight,
  IconAlertCircle,
  IconWallet,
} from "@tabler/icons-react";

type Step = "source" | "method" | "amount" | "details" | "review" | "processing" | "success";

interface Method {
  id: string;
  title: string;
  tag: string;
  tagType: "instant" | "slow" | "fee";
  desc: string;
  icon: React.ReactNode;
  minWithdraw: number;
  fee: number;
  processingTime: string;
}

const METHODS: Method[] = [
  {
    id: "bank",
    title: "Bank Transfer",
    tag: "1–3 Business Days",
    tagType: "slow",
    desc: "Wire to your registered bank account",
    icon: <IconBuildingBank size={20} strokeWidth={1.6} />,
    minWithdraw: 50,
    fee: 0,
    processingTime: "1–3 business days",
  },
  {
    id: "crypto",
    title: "Crypto Wallet",
    tag: "Instant",
    tagType: "instant",
    desc: "BTC, ETH, USDT to your wallet",
    icon: <IconCurrencyBitcoin size={20} strokeWidth={1.6} />,
    minWithdraw: 20,
    fee: 0,
    processingTime: "Within 1 hour",
  },
  {
    id: "mobile",
    title: "Mobile Money",
    tag: "Instant · 1% fee",
    tagType: "fee",
    desc: "M-Pesa, MTN, Airtel Money",
    icon: <IconDeviceMobile size={20} strokeWidth={1.6} />,
    minWithdraw: 5,
    fee: 1,
    processingTime: "Instant",
  },
];

type WalletKey = "main" | "trading" | "investing";

const WALLET_LABELS: Record<WalletKey, string> = {
  main: "Main Wallet",
  trading: "Trading Wallet",
  investing: "Investing Wallet",
};

const WALLET_COLORS: Record<WalletKey, string> = {
  main: "#CB1A36",
  trading: "#CB1A36",
  investing: "#1a9e75",
};

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

const WithdrawalUI = () => {
  const { wallets, withdraw } = useDashboard();

  const [step, setStep] = useState<Step>("source");
  const [sourceWallet, setSourceWallet] = useState<WalletKey>("main");
  const [method, setMethod] = useState<Method | null>(null);
  const [amount, setAmount] = useState("");
  const [bankDetails, setBankDetails] = useState({ accountName: "", accountNumber: "", bankName: "", routingNumber: "" });
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [detailsErrors, setDetailsErrors] = useState<Record<string, string>>({});
  const [amountError, setAmountError] = useState("");

  const parsedAmount = parseFloat(amount) || 0;
  const fee = method ? (parsedAmount * method.fee) / 100 : 0;
  const youReceive = parsedAmount - fee;
  const availableBalance = wallets[sourceWallet];

  const goBack = () => {
    if (step === "method") setStep("source");
    else if (step === "amount") setStep("method");
    else if (step === "details") setStep("amount");
    else if (step === "review") setStep(needsDetails ? "details" : "amount");
  };

  const needsDetails = method?.id === "bank" || method?.id === "crypto" || method?.id === "mobile";

  const handleMethodSelect = (m: Method) => {
    setMethod(m);
    setStep("amount");
  };

  const handleAmountNext = () => {
    if (!amount || parsedAmount <= 0) { setAmountError("Please enter an amount."); return; }
    if (method && parsedAmount < method.minWithdraw) { setAmountError(`Minimum withdrawal is $${method.minWithdraw}.`); return; }
    if (parsedAmount > availableBalance) { setAmountError(`Insufficient balance. Available: $${availableBalance.toFixed(2)}`); return; }
    setAmountError("");
    setStep(needsDetails ? "details" : "review");
  };

  const handleDetailsNext = () => {
    const errors: Record<string, string> = {};
    if (method?.id === "bank") {
      if (!bankDetails.accountName.trim()) errors.accountName = "Required";
      if (!bankDetails.accountNumber.trim()) errors.accountNumber = "Required";
      if (!bankDetails.bankName.trim()) errors.bankName = "Required";
    }
    if (method?.id === "crypto" && !cryptoAddress.trim()) errors.cryptoAddress = "Required";
    if (method?.id === "mobile" && !mobileNumber.trim()) errors.mobileNumber = "Required";
    setDetailsErrors(errors);
    if (Object.keys(errors).length === 0) setStep("review");
  };

  const handleConfirm = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2000));
    const label = `Withdrawal via ${method?.title}`;
    await withdraw(parsedAmount, sourceWallet, label);
    setStep("success");
  };

  if (step === "processing") {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.processing_screen}>
          <div className={styles.processing_spinner} />
          <p className={styles.processing_label}>Processing your withdrawal…</p>
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
            <h1 className={styles.success_title}>Withdrawal Submitted</h1>
            <p className={styles.success_sub}>
              Your withdrawal of <strong>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> is being processed.
            </p>

            <div className={styles.success_receipt}>
              <div className={styles.receipt_row}>
                <span>Source</span>
                <span>{WALLET_LABELS[sourceWallet]}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>Method</span>
                <span>{method?.title}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>Fee</span>
                <span>{fee > 0 ? `-$${fee.toFixed(2)}` : "None"}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>Processing time</span>
                <span>{method?.processingTime}</span>
              </div>
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>You receive</span>
                <span>${youReceive.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className={styles.success_balance}>
              {WALLET_LABELS[sourceWallet]} balance: <strong>${wallets[sourceWallet].toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
            </div>

            <div className={styles.success_actions}>
              <button className={styles.btn_primary} onClick={() => window.location.href = "/overview"}>
                Go to Dashboard
              </button>
              <button className={styles.btn_ghost} onClick={() => {
                setStep("source"); setMethod(null); setAmount("");
                setBankDetails({ accountName: "", accountNumber: "", bankName: "", routingNumber: "" });
                setCryptoAddress(""); setMobileNumber("");
              }}>
                Make Another Withdrawal
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

        {/* Header */}
        <div className={styles.header}>
          {step !== "source" && (
            <button className={styles.back_btn} onClick={goBack}>
              <IconChevronLeft size={16} /> Back
            </button>
          )}
          <div className={styles.header_text}>
            <h1 className={styles.title}>
              {step === "source" && "Withdraw Funds"}
              {step === "method" && "Withdrawal Method"}
              {step === "amount" && `Withdraw from ${WALLET_LABELS[sourceWallet]}`}
              {step === "details" && "Destination Details"}
              {step === "review" && "Confirm Withdrawal"}
            </h1>
            <p className={styles.subtitle}>
              {step === "source" && "Select which wallet to withdraw from."}
              {step === "method" && "Choose where you'd like to receive your funds."}
              {step === "amount" && `Available: $${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}. ${method?.fee ? `${method.fee}% fee applies.` : "No fees."}`}
              {step === "details" && "Enter your withdrawal destination."}
              {step === "review" && "Review carefully before confirming."}
            </p>
          </div>
        </div>

        {/* Source wallet selection */}
        {step === "source" && (
          <div className={styles.methods}>
            {(["main", "trading", "investing"] as WalletKey[]).map((w) => (
              <button
                key={w}
                className={`${styles.wallet_source_card} ${sourceWallet === w ? styles.wallet_source_active : ""}`}
                onClick={() => { setSourceWallet(w); setStep("method"); }}
              >
                <div className={styles.wallet_source_icon} style={{ background: `${WALLET_COLORS[w]}18`, color: WALLET_COLORS[w] }}>
                  <IconWallet size={20} strokeWidth={1.6} />
                </div>
                <div className={styles.method_info}>
                  <p className={styles.method_title}>{WALLET_LABELS[w]}</p>
                  <p className={styles.method_desc}>
                    ${wallets[w].toLocaleString("en-US", { minimumFractionDigits: 2 })} available
                  </p>
                </div>
                {wallets[w] === 0 && (
                  <span className={`${styles.method_tag} ${styles.tag_slow}`}>Empty</span>
                )}
                <IconArrowRight size={16} className={styles.method_arrow} strokeWidth={1.8} />
              </button>
            ))}

            <div className={styles.security_note}>
              <IconLock size={13} strokeWidth={1.8} />
              <span>Withdrawals are processed securely with 256-bit SSL encryption</span>
            </div>
          </div>
        )}

        {/* Method step */}
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
          </div>
        )}

        {/* Amount step */}
        {step === "amount" && (
          <div className={styles.amount_step}>
            <div className={styles.source_badge}>
              <div className={styles.source_dot} style={{ background: WALLET_COLORS[sourceWallet] }} />
              <span>From: <strong>{WALLET_LABELS[sourceWallet]}</strong></span>
              <span className={styles.source_balance}>${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>

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
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) { setAmount(val); setAmountError(""); }
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
              {QUICK_AMOUNTS.filter(q => q <= availableBalance).map((q) => (
                <button
                  key={q}
                  className={`${styles.quick_btn} ${amount === String(q) ? styles.quick_active : ""}`}
                  onClick={() => { setAmount(String(q)); setAmountError(""); }}
                >
                  ${q.toLocaleString()}
                </button>
              ))}
              {availableBalance > 0 && (
                <button
                  className={`${styles.quick_btn} ${amount === availableBalance.toFixed(2) ? styles.quick_active : ""}`}
                  onClick={() => { setAmount(availableBalance.toFixed(2)); setAmountError(""); }}
                >
                  Max
                </button>
              )}
            </div>

            {parsedAmount > 0 && method && (
              <div className={styles.amount_summary}>
                <div className={styles.summary_row}>
                  <span>Withdrawal amount</span>
                  <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                {fee > 0 && (
                  <div className={styles.summary_row}>
                    <span>Fee ({method.fee}%)</span>
                    <span>-${fee.toFixed(2)}</span>
                  </div>
                )}
                <div className={`${styles.summary_row} ${styles.summary_total}`}>
                  <span>You receive</span>
                  <span>${youReceive.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            <button
              className={styles.btn_primary}
              disabled={!amount || parsedAmount <= 0}
              onClick={handleAmountNext}
            >
              Continue <IconArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Details step */}
        {step === "details" && (
          <div className={styles.card_step}>
            {method?.id === "bank" && (
              <div className={styles.card_fields}>
                <div className={styles.field_group}>
                  <label>Account Holder Name</label>
                  <input
                    placeholder="Full name on account"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails(p => ({ ...p, accountName: e.target.value }))}
                    className={detailsErrors.accountName ? styles.field_error : ""}
                  />
                  {detailsErrors.accountName && <span className={styles.field_err_msg}>{detailsErrors.accountName}</span>}
                </div>
                <div className={styles.field_group}>
                  <label>Bank Name</label>
                  <input
                    placeholder="e.g. Chase, Barclays, GTBank"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails(p => ({ ...p, bankName: e.target.value }))}
                    className={detailsErrors.bankName ? styles.field_error : ""}
                  />
                  {detailsErrors.bankName && <span className={styles.field_err_msg}>{detailsErrors.bankName}</span>}
                </div>
                <div className={styles.field_group}>
                  <label>Account Number / IBAN</label>
                  <input
                    placeholder="Enter account number"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(p => ({ ...p, accountNumber: e.target.value }))}
                    className={detailsErrors.accountNumber ? styles.field_error : ""}
                  />
                  {detailsErrors.accountNumber && <span className={styles.field_err_msg}>{detailsErrors.accountNumber}</span>}
                </div>
                <div className={styles.field_group}>
                  <label>Routing / Sort Code <span style={{ color: "var(--dash-text-muted)", fontWeight: 400 }}>(optional)</span></label>
                  <input
                    placeholder="e.g. 04-00-75"
                    value={bankDetails.routingNumber}
                    onChange={(e) => setBankDetails(p => ({ ...p, routingNumber: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {method?.id === "crypto" && (
              <div className={styles.card_fields}>
                <div className={styles.field_group}>
                  <label>Wallet Address</label>
                  <input
                    placeholder="Enter your crypto wallet address"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    className={detailsErrors.cryptoAddress ? styles.field_error : ""}
                    style={{ fontFamily: "monospace", fontSize: 13 }}
                  />
                  {detailsErrors.cryptoAddress && <span className={styles.field_err_msg}>{detailsErrors.cryptoAddress}</span>}
                </div>
                <div className={styles.instructions_box}>
                  <p className={styles.instructions_label}>Supported assets</p>
                  <p className={styles.instructions_text}>USDT (TRC20), BTC (Bitcoin), ETH (ERC20). Double-check your address before confirming.</p>
                </div>
              </div>
            )}

            {method?.id === "mobile" && (
              <div className={styles.card_fields}>
                <div className={styles.field_group}>
                  <label>Mobile Number</label>
                  <input
                    placeholder="+234 800 000 0000"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className={detailsErrors.mobileNumber ? styles.field_error : ""}
                  />
                  {detailsErrors.mobileNumber && <span className={styles.field_err_msg}>{detailsErrors.mobileNumber}</span>}
                </div>
                <div className={styles.instructions_box}>
                  <p className={styles.instructions_label}>Supported providers</p>
                  <p className={styles.instructions_text}>M-Pesa, MTN Mobile Money, Airtel Money. Your number must be registered with the provider.</p>
                </div>
              </div>
            )}

            <div className={styles.security_note}>
              <IconLock size={13} /> <span>Your details are encrypted and used only to process this withdrawal.</span>
            </div>

            <button className={styles.btn_primary} onClick={handleDetailsNext}>
              Review Withdrawal <IconArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Review step */}
        {step === "review" && (
          <div className={styles.review_step}>
            <div className={styles.review_method}>
              <div className={styles.review_method_icon} style={{ background: `${WALLET_COLORS[sourceWallet]}18`, color: WALLET_COLORS[sourceWallet] }}>
                <IconWallet size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className={styles.review_method_name}>From {WALLET_LABELS[sourceWallet]}</p>
                <p className={styles.review_method_tag}>via {method?.title}</p>
              </div>
            </div>

            <div className={styles.review_receipt}>
              <div className={styles.receipt_row}>
                <span>Withdrawal amount</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              {fee > 0 && (
                <div className={styles.receipt_row}>
                  <span>Fee ({method?.fee}%)</span>
                  <span>-${fee.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.receipt_row}>
                <span>Processing time</span>
                <span>{method?.processingTime}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>Remaining balance</span>
                <span>${(availableBalance - parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>You receive</span>
                <span>${youReceive.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {method?.id === "bank" && bankDetails.accountNumber && (
              <div className={styles.review_card_preview}>
                <IconBuildingBank size={15} strokeWidth={1.6} />
                <span>{bankDetails.bankName} · ****{bankDetails.accountNumber.slice(-4)} · {bankDetails.accountName}</span>
              </div>
            )}
            {method?.id === "crypto" && cryptoAddress && (
              <div className={styles.review_card_preview}>
                <IconCurrencyBitcoin size={15} strokeWidth={1.6} />
                <span style={{ fontFamily: "monospace", fontSize: 12 }}>{cryptoAddress.slice(0, 8)}...{cryptoAddress.slice(-6)}</span>
              </div>
            )}
            {method?.id === "mobile" && mobileNumber && (
              <div className={styles.review_card_preview}>
                <IconDeviceMobile size={15} strokeWidth={1.6} />
                <span>{mobileNumber}</span>
              </div>
            )}

            <div className={styles.security_note}>
              <IconLock size={13} /> <span>Secured with 256-bit SSL encryption</span>
            </div>

            <button className={styles.btn_primary} onClick={handleConfirm}>
              Confirm Withdrawal <IconArrowRight size={16} />
            </button>
            <button className={styles.btn_ghost} onClick={goBack}>Edit details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export { WithdrawalUI };