
"use client";
import { Button } from "@/components";
import {
  IconArrowRight,
  IconBusinessplan,
  IconChartBar,
  IconTrendingUp,
  IconX,
  IconCircleCheckFilled,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import styles from "./styles.module.scss";

type WalletKey = "main" | "trading" | "investing";

const WALLET_META: Record<WalletKey, { label: string; color: string; icon: React.ReactNode }> = {
  main: { label: "Main Wallet", color: "#CB1A36", icon: <IconBusinessplan size={20} /> },
  trading: { label: "Trading Wallet", color: "#CB1A36", icon: <IconTrendingUp size={20} /> },
  investing: { label: "Investing Wallet", color: "#1a9e75", icon: <IconChartBar size={20} /> },
};

const QUICK_PERCENTAGES = [25, 50, 75, 100];

export const TransferModal = ({
  isOpen,
  onClose,
  from,
  to,
  transfer,
  wallets,
}: {
  isOpen: boolean;
  onClose: () => void;
  from: WalletKey;
  to: WalletKey;
  transfer: (from: WalletKey, to: WalletKey, amount: number) => Promise<boolean>;
  wallets: { main: number; trading: number; investing: number };
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<"input" | "processing" | "success">("input");

  const fromMeta = WALLET_META[from];
  const toMeta = WALLET_META[to];
  const available = wallets[from];
  const parsedAmount = parseFloat(amount) || 0;

  const handleTransfer = async () => {
    setError("");
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (parsedAmount > available) {
      setError("Insufficient balance.");
      return;
    }

    setPhase("processing");
    await new Promise((r) => setTimeout(r, 1100));

    const ok = await transfer(from, to, parsedAmount);
    if (ok) {
      setPhase("success");
    } else {
      setPhase("input");
      setError("Transfer failed. Please try again.");
    }
  };

  const handleClose = () => {
    setAmount("");
    setError("");
    setPhase("input");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>
            {phase === "success" ? "Transfer Successful" : phase === "processing" ? "Processing" : "Transfer Funds"}
          </h2>
          {phase !== "processing" && (
            <button className={styles.modal_close} onClick={handleClose}>
              <IconX size={18} />
            </button>
          )}
        </div>

        {phase === "processing" && (
          <div className={styles.tf_processing}>
            <div className={styles.tf_spinner} />
            <p className={styles.tf_processing_text}>
              Moving ${parsedAmount.toFixed(2)} from {fromMeta.label} to {toMeta.label}…
            </p>
          </div>
        )}

        {phase === "success" && (
          <div className={styles.modal_success}>
            <div className={styles.tf_success_icon}>
              <IconCircleCheckFilled size={48} />
            </div>
            <p className={styles.modal_success_msg}>
              ${parsedAmount.toFixed(2)} moved from {fromMeta.label} to {toMeta.label}.
            </p>

            <div className={styles.tf_receipt}>
              <div className={styles.tf_receipt_row}>
                <span>New {fromMeta.label} balance</span>
                <span>${(available - parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.tf_receipt_row}>
                <span>New {toMeta.label} balance</span>
                <span>${(wallets[to] + parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <Button variant="fill-red" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}

        {phase === "input" && (
          <>
            <div className={styles.transfer_route}>
              <span className={styles.tf_route_card} style={{ borderColor: `${fromMeta.color}40`, background: `${fromMeta.color}0d` }}>
                <span className={styles.tf_route_icon} style={{ color: fromMeta.color }}>{fromMeta.icon}</span>
                {fromMeta.label}
              </span>
              <IconArrowRight size={18} className={styles.route_arrow} />
              <span className={styles.tf_route_card} style={{ borderColor: `${toMeta.color}40`, background: `${toMeta.color}0d` }}>
                <span className={styles.tf_route_icon} style={{ color: toMeta.color }}>{toMeta.icon}</span>
                {toMeta.label}
              </span>
            </div>

            <div className={styles.transfer_info}>
              <p className={styles.transfer_label}>Available Balance</p>
              <p className={styles.transfer_balance}>
                ${available.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </p>
            </div>

            <div className={styles.input_group}>
              <label className={styles.input_label}>Amount (USD)</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setAmount(val);
                    setError("");
                  }
                }}
                className={styles.transfer_input}
              />

              <div className={styles.tf_percent_row}>
                {QUICK_PERCENTAGES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={styles.tf_percent_btn}
                    onClick={() => setAmount(((available * p) / 100).toFixed(2))}
                    disabled={available <= 0}
                  >
                    {p === 100 ? "Max" : `${p}%`}
                  </button>
                ))}
              </div>

              {error && (
                <p className={styles.transfer_error}>
                  <IconAlertCircle size={13} /> {error}
                </p>
              )}
            </div>

            {parsedAmount > 0 && parsedAmount <= available && (
              <div className={styles.tf_preview}>
                <div className={styles.tf_preview_row}>
                  <span>{fromMeta.label} after</span>
                  <span>${(available - parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={styles.tf_preview_row}>
                  <span>{toMeta.label} after</span>
                  <span>${(wallets[to] + parsedAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            <div className={styles.modal_actions}>
              <Button variant="outline-red" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="fill-red" onClick={handleTransfer}>
                Confirm Transfer
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const DestinationModal = ({
  isOpen,
  onClose,
  source,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  source: WalletKey | null;
  onSelect: (id: WalletKey) => void;
}) => {
  const [selectedId, setSelectedId] = useState<WalletKey | null>(null);

  if (!isOpen || !source) return null;

  const options: { id: WalletKey; label: string; icon: React.ReactNode }[] = (
    [
      { id: "main", label: "Main Wallet", icon: <IconBusinessplan size={24} /> },
      { id: "trading", label: "Trading Wallet", icon: <IconTrendingUp size={24} /> },
      { id: "investing", label: "Investing Wallet", icon: <IconChartBar size={24} /> },
    ] as { id: WalletKey; label: string; icon: React.ReactNode }[]
  ).filter((opt) => opt.id !== source);

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>Select Destination</h2>
          <button onClick={onClose} className={styles.close_btn}>
            <IconX size={20} />
          </button>
        </div>

        <div className={styles.selection_grid}>
          {options.map((opt) => (
            <div
              key={opt.id}
              className={`${styles.selection_card} ${selectedId === opt.id ? styles.active : ""}`}
              onClick={() => setSelectedId(opt.id)}
            >
              <div className={styles.check_circle}>
                {selectedId === opt.id && <div className={styles.check_inner} />}
              </div>
              <div className={styles.icon_wrapper}>{opt.icon}</div>
              <span className={styles.card_label}>{opt.label}</span>
            </div>
          ))}
        </div>

        <Button
          fullWidth
          disabled={!selectedId}
          onClick={() => selectedId && onSelect(selectedId)}
        >
          Continue to transfer
        </Button>
      </div>
    </div>
  );
};

export const ComingSoonModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Coming Soon!</h2>
        <p>This feature is under development and will be available soon.</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};