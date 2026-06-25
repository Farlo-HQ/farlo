// "use client";
// import { useState } from "react";
// import styles from "./styles.module.scss";
// import { useDashboard } from "@/context/DashboardContext";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";
// import {
//   IconUser,
//   IconMail,
//   IconArrowRight,
//   IconChevronLeft,
//   IconCircleCheckFilled,
//   IconLock,
//   IconAlertCircle,
//   IconWallet,
//   IconHistory,
//   IconClock,
//   IconSearch,
// } from "@tabler/icons-react";

// type Step = "recipient" | "amount" | "review" | "processing" | "success";
// type WalletKey = "main" | "trading" | "investing";

// interface Recipient {
//   email: string;
//   name?: string;
//   isFarloUser: boolean;
// }

// const WALLET_OPTIONS: { key: WalletKey; label: string; color: string }[] = [
//   { key: "main", label: "Main Wallet", color: "#CB1A36" },
//   { key: "trading", label: "Trading Wallet", color: "#CB1A36" },
//   { key: "investing", label: "Investing Wallet", color: "#1a9e75" },
// ];

// const PaymentsUI = () => {
//   const [step, setStep] = useState<Step>("recipient");
//   const [recipientInput, setRecipientInput] = useState("");
//   const [recipient, setRecipient] = useState<Recipient | null>(null);
//   const [checking, setChecking] = useState(false);
//   const [recipientError, setRecipientError] = useState("");
//   const [sourceWallet, setSourceWallet] = useState<WalletKey>("main");
//   const [amount, setAmount] = useState("");
//   const [note, setNote] = useState("");
//   const [amountError, setAmountError] = useState("");
//   const [recentRecipients, setRecentRecipients] = useState<Recipient[]>([]);

//   const { wallets, userProfile, withdraw, pushNotification, addTransaction } = useDashboard();
//   const router = useRouter();

//   const parsedAmount = parseFloat(amount) || 0;
//   const available = wallets[sourceWallet];

//   const handleRecipientLookup = async () => {
//     const value = recipientInput.trim().toLowerCase();
//     if (!value || !value.includes("@")) {
//       setRecipientError("Enter a valid email address.");
//       return;
//     }
//     if (value === userProfile?.email?.toLowerCase()) {
//       setRecipientError("You cannot send money to yourself.");
//       return;
//     }

//     setChecking(true);
//     setRecipientError("");

//     const { data } = await supabase
//       .from("profiles")
//       .select("email, first_name, last_name")
//       .eq("email", value)
//       .maybeSingle();

//     setChecking(false);

//     if (data) {
//       const name = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();
//       setRecipient({ email: data.email, name: name || undefined, isFarloUser: true });
//     } else {
//       setRecipient({ email: value, isFarloUser: false });
//     }
//     setStep("amount");
//   };

//   const handleAmountNext = () => {
//     if (!amount || parsedAmount <= 0) { setAmountError("Enter an amount to send."); return; }
//     if (parsedAmount > available) { setAmountError(`Insufficient balance. Available: $${available.toFixed(2)}`); return; }
//     setAmountError("");
//     setStep("review");
//   };

//   const handleConfirm = async () => {
//     setStep("processing");
//     await new Promise((r) => setTimeout(r, 1800));

//     const recipientLabel = recipient?.name || recipient?.email || "recipient";

//     // Debit the sender's wallet via withdraw (reuses the same wallet-safe
//     // debit logic, persists to Supabase, writes a transaction)
//     const ok = await withdraw(parsedAmount, sourceWallet, `Sent to ${recipientLabel}${note ? ` — "${note}"` : ""}`);

//     if (!ok) {
//       setStep("amount");
//       setAmountError("Transfer failed. Please try again.");
//       return;
//     }

//     // If recipient is also a Farlo user, credit their main wallet directly
//     // so this feels like a real peer-to-peer payment network, not just
//     // money disappearing into the void.
//     if (recipient?.isFarloUser) {
//       const { data: recipientProfile } = await supabase
//         .from("profiles")
//         .select("id")
//         .eq("email", recipient.email)
//         .maybeSingle();

//       if (recipientProfile?.id) {
//         const { data: recipientWallet } = await supabase
//           .from("wallets")
//           .select("main_balance")
//           .eq("user_id", recipientProfile.id)
//           .single();

//         if (recipientWallet) {
//           await supabase
//             .from("wallets")
//             .update({ main_balance: recipientWallet.main_balance + parsedAmount, updated_at: new Date().toISOString() })
//             .eq("user_id", recipientProfile.id);

//           await supabase.from("transactions").insert({
//             user_id: recipientProfile.id,
//             type: "deposit",
//             wallet: "main",
//             label: `Received from ${userProfile?.firstName ?? userProfile?.email}${note ? ` — "${note}"` : ""}`,
//             amount: parsedAmount,
//             date: new Date().toISOString(),
//             status: "completed",
//           });

//           await supabase.from("notifications").insert({
//             user_id: recipientProfile.id,
//             title: "Money Received",
//             message: `You received $${parsedAmount.toFixed(2)} from ${userProfile?.firstName ?? userProfile?.email}.`,
//             type: "success",
//             read: false,
//           });
//         }
//       }
//     }

//     setStep("success");
//   };

//   const walletInfo = WALLET_OPTIONS.find((w) => w.key === sourceWallet)!;

//   if (step === "processing") {
//     return (
//       <div className={styles.page_wrapper}>
//         <div className={styles.processing_screen}>
//           <div className={styles.processing_spinner} />
//           <p className={styles.processing_label}>Sending ${parsedAmount.toFixed(2)}…</p>
//           <p className={styles.processing_sub}>Please do not close this window.</p>
//         </div>
//       </div>
//     );
//   }

//   if (step === "success") {
//     return (
//       <div className={styles.page_wrapper}>
//         <div className={styles.container}>
//           <div className={styles.success_view}>
//             <div className={styles.success_icon}>
//               <IconCircleCheckFilled size={52} />
//             </div>
//             <h1 className={styles.success_title}>Payment Sent</h1>
//             <p className={styles.success_sub}>
//               <strong>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> sent to {recipient?.name || recipient?.email}.
//             </p>

//             <div className={styles.success_receipt}>
//               <div className={styles.receipt_row}>
//                 <span>Recipient</span>
//                 <span>{recipient?.email}</span>
//               </div>
//               <div className={styles.receipt_row}>
//                 <span>From</span>
//                 <span>{walletInfo.label}</span>
//               </div>
//               {note && (
//                 <div className={styles.receipt_row}>
//                   <span>Note</span>
//                   <span>{note}</span>
//                 </div>
//               )}
//               <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
//                 <span>Amount sent</span>
//                 <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
//               </div>
//             </div>

//             {!recipient?.isFarloUser && (
//               <div className={styles.info_box}>
//                 <IconAlertCircle size={14} />
//                 <span>{recipient?.email} isn't on Farlo yet. They'll receive an email to claim these funds.</span>
//               </div>
//             )}

//             <div className={styles.success_actions}>
//               <button className={styles.btn_primary} onClick={() => router.push("/overview")}>
//                 Go to Dashboard
//               </button>
//               <button className={styles.btn_ghost} onClick={() => {
//                 setStep("recipient");
//                 setRecipient(null);
//                 setRecipientInput("");
//                 setAmount("");
//                 setNote("");
//               }}>
//                 Send Another Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.page_wrapper}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           {step !== "recipient" && (
//             <button
//               className={styles.back_btn}
//               onClick={() => setStep(step === "review" ? "amount" : "recipient")}
//             >
//               <IconChevronLeft size={16} /> Back
//             </button>
//           )}
//           <div className={styles.header_text}>
//             <h1 className={styles.title}>
//               {step === "recipient" && "Send Money"}
//               {step === "amount" && "Enter Amount"}
//               {step === "review" && "Review Payment"}
//             </h1>
//             <p className={styles.subtitle}>
//               {step === "recipient" && "Send funds to anyone using their email address."}
//               {step === "amount" && `Sending to ${recipient?.name || recipient?.email}`}
//               {step === "review" && "Double-check the details before sending."}
//             </p>
//           </div>
//         </div>

//         {step === "recipient" && (
//           <div className={styles.amount_step}>
//             <div className={styles.field_group}>
//               <label>Recipient Email</label>
//               <div className={styles.search_wrap}>
//                 <IconMail size={16} className={styles.search_icon} />
//                 <input
//                   autoFocus
//                   type="email"
//                   placeholder="name@example.com"
//                   value={recipientInput}
//                   onChange={(e) => { setRecipientInput(e.target.value); setRecipientError(""); }}
//                   onKeyDown={(e) => e.key === "Enter" && handleRecipientLookup()}
//                 />
//               </div>
//               {recipientError && (
//                 <span className={styles.field_err_msg}>
//                   <IconAlertCircle size={13} /> {recipientError}
//                 </span>
//               )}
//             </div>

//             <button className={styles.btn_primary} onClick={handleRecipientLookup} disabled={checking}>
//               {checking ? "Looking up recipient…" : "Continue"} <IconArrowRight size={16} />
//             </button>

//             <div className={styles.security_note}>
//               <IconLock size={13} strokeWidth={1.8} />
//               <span>Payments are instant between Farlo users and secured end to end</span>
//             </div>
//           </div>
//         )}

//         {step === "amount" && (
//           <div className={styles.amount_step}>
//             <div className={styles.recipient_card}>
//               <div className={styles.recipient_avatar}>
//                 {recipient?.name ? recipient.name[0].toUpperCase() : <IconUser size={18} />}
//               </div>
//               <div>
//                 <p className={styles.recipient_name}>{recipient?.name || "New recipient"}</p>
//                 <p className={styles.recipient_email}>{recipient?.email}</p>
//               </div>
//               {recipient?.isFarloUser && <span className={styles.farlo_badge}>Farlo user</span>}
//             </div>

//             <div className={styles.field_group}>
//               <label>Send from</label>
//               <div className={styles.wallet_pills}>
//                 {WALLET_OPTIONS.map((w) => (
//                   <button
//                     key={w.key}
//                     className={`${styles.wallet_pill} ${sourceWallet === w.key ? styles.wallet_pill_active : ""}`}
//                     style={sourceWallet === w.key ? { borderColor: w.color, color: w.color, background: `${w.color}10` } : undefined}
//                     onClick={() => setSourceWallet(w.key)}
//                   >
//                     <IconWallet size={14} />
//                     {w.label}
//                   </button>
//                 ))}
//               </div>
//               <p className={styles.balance_hint}>
//                 Available: ${available.toLocaleString("en-US", { minimumFractionDigits: 2 })}
//               </p>
//             </div>

//             <div className={styles.amount_input_wrap}>
//               <span className={styles.currency_symbol}>$</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 placeholder="0.00"
//                 className={styles.amount_input}
//                 value={amount}
//                 onChange={(e) => {
//                   const val = e.target.value;
//                   if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) { setAmount(val); setAmountError(""); }
//                 }}
//               />
//               <span className={styles.currency_label}>USD</span>
//             </div>

//             {amountError && (
//               <div className={styles.amount_error}>
//                 <IconAlertCircle size={14} /> {amountError}
//               </div>
//             )}

//             <div className={styles.field_group}>
//               <label>Note <span className={styles.optional_tag}>(optional)</span></label>
//               <input
//                 type="text"
//                 placeholder="What's this for?"
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 maxLength={60}
//               />
//             </div>

//             <button className={styles.btn_primary} disabled={!amount || parsedAmount <= 0} onClick={handleAmountNext}>
//               Continue <IconArrowRight size={16} />
//             </button>
//           </div>
//         )}

//         {step === "review" && (
//           <div className={styles.review_step}>
//             <div className={styles.review_method}>
//               <div className={styles.review_method_icon}>
//                 {recipient?.name ? recipient.name[0].toUpperCase() : <IconUser size={18} />}
//               </div>
//               <div>
//                 <p className={styles.review_method_name}>{recipient?.name || recipient?.email}</p>
//                 <p className={styles.review_method_tag}>{recipient?.isFarloUser ? "Farlo user · Instant" : "External · via email"}</p>
//               </div>
//             </div>

//             <div className={styles.review_receipt}>
//               <div className={styles.receipt_row}>
//                 <span>Amount</span>
//                 <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
//               </div>
//               <div className={styles.receipt_row}>
//                 <span>From</span>
//                 <span>{walletInfo.label}</span>
//               </div>
//               {note && (
//                 <div className={styles.receipt_row}>
//                   <span>Note</span>
//                   <span>{note}</span>
//                 </div>
//               )}
//               <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
//                 <span>Total</span>
//                 <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
//               </div>
//             </div>

//             <div className={styles.security_note}>
//               <IconLock size={13} /> <span>Secured with 256-bit SSL encryption</span>
//             </div>

//             <button className={styles.btn_primary} onClick={handleConfirm}>
//               Send Payment <IconArrowRight size={16} />
//             </button>
//             <button className={styles.btn_ghost} onClick={() => setStep("amount")}>Edit details</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export { PaymentsUI };

"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  IconUser,
  IconMail,
  IconArrowRight,
  IconChevronLeft,
  IconCircleCheckFilled,
  IconLock,
  IconAlertCircle,
  IconWallet,
  IconClock,
  IconSend,
} from "@tabler/icons-react";

type Step = "recipient" | "amount" | "review" | "processing" | "success";
type WalletKey = "main" | "trading" | "investing";

interface Recipient {
  email: string;
  name?: string;
  isFarloUser: boolean;
}

interface RecentContact {
  email: string;
  name?: string;
  lastAmount: number;
  lastDate: string;
}

const WALLET_OPTIONS: { key: WalletKey; label: string; color: string }[] = [
  { key: "main", label: "Main Wallet", color: "#CB1A36" },
  { key: "trading", label: "Trading Wallet", color: "#CB1A36" },
  { key: "investing", label: "Investing Wallet", color: "#1a9e75" },
];

const PaymentsUI = () => {
  const [step, setStep] = useState<Step>("recipient");
  const [recipientInput, setRecipientInput] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [checking, setChecking] = useState(false);
  const [recipientError, setRecipientError] = useState("");
  const [sourceWallet, setSourceWallet] = useState<WalletKey>("main");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [amountError, setAmountError] = useState("");
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);

  const { wallets, userProfile, withdraw, transactions } = useDashboard();
  const router = useRouter();

  const parsedAmount = parseFloat(amount) || 0;
  const available = wallets[sourceWallet];

  // Build a "recent contacts" strip from past sent payments — this is
  // what gives Payments its own identity instead of feeling like a
  // second Deposit screen: it remembers who you've paid before.
  useEffect(() => {
    const sentPayments = transactions.filter((t) => t.label?.startsWith("Sent to "));
    const seen = new Map<string, RecentContact>();
    for (const t of sentPayments) {
      const match = t.label.match(/^Sent to ([^—]+)/);
      const name = match ? match[1].trim() : "Unknown";
      if (!seen.has(name)) {
        seen.set(name, { email: name, name, lastAmount: Math.abs(t.amount), lastDate: t.date });
      }
    }
    setRecentContacts(Array.from(seen.values()).slice(0, 4));
  }, [transactions]);

  const handleRecipientLookup = async (presetEmail?: string) => {
    const value = (presetEmail ?? recipientInput).trim().toLowerCase();
    if (!value || !value.includes("@")) {
      setRecipientError("Enter a valid email address.");
      return;
    }
    if (value === userProfile?.email?.toLowerCase()) {
      setRecipientError("You cannot send money to yourself.");
      return;
    }

    setChecking(true);
    setRecipientError("");

    const { data } = await supabase
      .from("profiles")
      .select("email, first_name, last_name")
      .eq("email", value)
      .maybeSingle();

    setChecking(false);

    if (data) {
      const name = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();
      setRecipient({ email: data.email, name: name || undefined, isFarloUser: true });
    } else {
      setRecipient({ email: value, isFarloUser: false });
    }
    setStep("amount");
  };

  const handleAmountNext = () => {
    if (!amount || parsedAmount <= 0) { setAmountError("Enter an amount to send."); return; }
    if (parsedAmount > available) { setAmountError(`Insufficient balance. Available: $${available.toFixed(2)}`); return; }
    setAmountError("");
    setStep("review");
  };

  const handleConfirm = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 1800));

    const recipientLabel = recipient?.name || recipient?.email || "recipient";
    const ok = await withdraw(parsedAmount, sourceWallet, `Sent to ${recipientLabel}${note ? ` — "${note}"` : ""}`);

    if (!ok) {
      setStep("amount");
      setAmountError("Transfer failed. Please try again.");
      return;
    }

    if (recipient?.isFarloUser) {
      const { data: recipientProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", recipient.email)
        .maybeSingle();

      if (recipientProfile?.id) {
        const { data: recipientWallet } = await supabase
          .from("wallets")
          .select("main_balance")
          .eq("user_id", recipientProfile.id)
          .single();

        if (recipientWallet) {
          await supabase
            .from("wallets")
            .update({ main_balance: recipientWallet.main_balance + parsedAmount, updated_at: new Date().toISOString() })
            .eq("user_id", recipientProfile.id);

          await supabase.from("transactions").insert({
            user_id: recipientProfile.id,
            type: "deposit",
            wallet: "main",
            label: `Received from ${userProfile?.firstName ?? userProfile?.email}${note ? ` — "${note}"` : ""}`,
            amount: parsedAmount,
            date: new Date().toISOString(),
            status: "completed",
          });

          await supabase.from("notifications").insert({
            user_id: recipientProfile.id,
            title: "Money Received",
            message: `You received $${parsedAmount.toFixed(2)} from ${userProfile?.firstName ?? userProfile?.email}.`,
            type: "success",
            read: false,
          });
        }
      }
    }

    setStep("success");
  };

  const walletInfo = WALLET_OPTIONS.find((w) => w.key === sourceWallet)!;

  if (step === "processing") {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.processing_screen}>
          <div className={styles.send_anim}>
            <IconSend size={28} />
          </div>
          <p className={styles.processing_label}>Sending ${parsedAmount.toFixed(2)}…</p>
          <p className={styles.processing_sub}>To {recipient?.name || recipient?.email}</p>
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
            <h1 className={styles.success_title}>Payment Sent</h1>
            <p className={styles.success_sub}>
              <strong>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> sent to {recipient?.name || recipient?.email}.
            </p>

            <div className={styles.success_receipt}>
              <div className={styles.receipt_row}>
                <span>Recipient</span>
                <span>{recipient?.email}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>From</span>
                <span>{walletInfo.label}</span>
              </div>
              {note && (
                <div className={styles.receipt_row}>
                  <span>Note</span>
                  <span>{note}</span>
                </div>
              )}
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>Amount sent</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {!recipient?.isFarloUser && (
              <div className={styles.info_box}>
                <IconAlertCircle size={14} />
                <span>{recipient?.email} isn't on Farlo yet. They'll receive an email to claim these funds.</span>
              </div>
            )}

            <div className={styles.success_actions}>
              <button className={styles.btn_primary} onClick={() => router.push("/overview")}>
                Go to Dashboard
              </button>
              <button className={styles.btn_ghost} onClick={() => {
                setStep("recipient");
                setRecipient(null);
                setRecipientInput("");
                setAmount("");
                setNote("");
              }}>
                Send Another Payment
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
          {step !== "recipient" && (
            <button className={styles.back_btn} onClick={() => setStep(step === "review" ? "amount" : "recipient")}>
              <IconChevronLeft size={16} /> Back
            </button>
          )}
          <div className={styles.header_text}>
            <h1 className={styles.title}>
              {step === "recipient" && "Pay Someone"}
              {step === "amount" && "Enter Amount"}
              {step === "review" && "Review Payment"}
            </h1>
            <p className={styles.subtitle}>
              {step === "recipient" && "Send money instantly to anyone using their email."}
              {step === "amount" && `Sending to ${recipient?.name || recipient?.email}`}
              {step === "review" && "Double-check the details before sending."}
            </p>
          </div>
        </div>

        {step === "recipient" && (
          <div className={styles.amount_step}>
            {/* Recent contacts strip — the thing that makes this feel like
                a payments app and not a deposit form */}
            {recentContacts.length > 0 && (
              <div className={styles.contacts_strip}>
                <p className={styles.contacts_label}>Recent</p>
                <div className={styles.contacts_row}>
                  {recentContacts.map((c) => (
                    <button
                      key={c.email}
                      className={styles.contact_chip}
                      onClick={() => { setRecipientInput(c.email); handleRecipientLookup(c.email); }}
                    >
                      <span className={styles.contact_avatar}>{c.name ? c.name[0].toUpperCase() : <IconUser size={16} />}</span>
                      <span className={styles.contact_name}>{c.name?.split(" ")[0] || c.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.field_group}>
              <label>Recipient Email</label>
              <div className={styles.search_wrap}>
                <IconMail size={16} className={styles.search_icon} />
                <input
                  autoFocus
                  type="email"
                  placeholder="name@example.com"
                  value={recipientInput}
                  onChange={(e) => { setRecipientInput(e.target.value); setRecipientError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleRecipientLookup()}
                />
              </div>
              {recipientError && (
                <span className={styles.field_err_msg}>
                  <IconAlertCircle size={13} /> {recipientError}
                </span>
              )}
            </div>

            <button className={styles.btn_primary} onClick={() => handleRecipientLookup()} disabled={checking}>
              {checking ? "Looking up recipient…" : "Continue"} <IconArrowRight size={16} />
            </button>

            <div className={styles.security_note}>
              <IconLock size={13} strokeWidth={1.8} />
              <span>Payments are instant between Farlo users and secured end to end</span>
            </div>
          </div>
        )}

        {step === "amount" && (
          <div className={styles.amount_step}>
            <div className={styles.recipient_card}>
              <div className={styles.recipient_avatar}>
                {recipient?.name ? recipient.name[0].toUpperCase() : <IconUser size={18} />}
              </div>
              <div>
                <p className={styles.recipient_name}>{recipient?.name || "New recipient"}</p>
                <p className={styles.recipient_email}>{recipient?.email}</p>
              </div>
              {recipient?.isFarloUser && <span className={styles.farlo_badge}>Farlo user</span>}
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

            {amountError && (
              <div className={styles.amount_error}>
                <IconAlertCircle size={14} /> {amountError}
              </div>
            )}

            <div className={styles.field_group}>
              <label>Send from</label>
              <div className={styles.wallet_pills}>
                {WALLET_OPTIONS.map((w) => (
                  <button
                    key={w.key}
                    className={`${styles.wallet_pill} ${sourceWallet === w.key ? styles.wallet_pill_active : ""}`}
                    style={sourceWallet === w.key ? { borderColor: w.color, color: w.color, background: `${w.color}10` } : undefined}
                    onClick={() => setSourceWallet(w.key)}
                  >
                    <IconWallet size={14} />
                    {w.label}
                  </button>
                ))}
              </div>
              <p className={styles.balance_hint}>Available: ${available.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>

            <div className={styles.field_group}>
              <label>Note <span className={styles.optional_tag}>(optional)</span></label>
              <input
                type="text"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={60}
              />
            </div>

            <button className={styles.btn_primary} disabled={!amount || parsedAmount <= 0} onClick={handleAmountNext}>
              Continue <IconArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "review" && (
          <div className={styles.review_step}>
            <div className={styles.review_method}>
              <div className={styles.review_method_icon}>
                {recipient?.name ? recipient.name[0].toUpperCase() : <IconUser size={18} />}
              </div>
              <div>
                <p className={styles.review_method_name}>{recipient?.name || recipient?.email}</p>
                <p className={styles.review_method_tag}>{recipient?.isFarloUser ? "Farlo user · Instant" : "External · via email"}</p>
              </div>
            </div>

            <div className={styles.review_receipt}>
              <div className={styles.receipt_row}>
                <span>Amount</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.receipt_row}>
                <span>From</span>
                <span>{walletInfo.label}</span>
              </div>
              {note && (
                <div className={styles.receipt_row}>
                  <span>Note</span>
                  <span>{note}</span>
                </div>
              )}
              <div className={`${styles.receipt_row} ${styles.receipt_total}`}>
                <span>Total</span>
                <span>${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className={styles.security_note}>
              <IconLock size={13} /> <span>Secured with 256-bit SSL encryption</span>
            </div>

            <button className={styles.btn_primary} onClick={handleConfirm}>
              Send Payment <IconArrowRight size={16} />
            </button>
            <button className={styles.btn_ghost} onClick={() => setStep("amount")}>Edit details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export { PaymentsUI };