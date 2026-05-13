import { Button } from "@/components";
import { IconArrowRight, IconBusinessplan, IconChartBar, IconTrendingUp, IconX } from "@tabler/icons-react";
import { useState } from "react";
import styles from "./styles.module.scss";

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
  from: "main" | "trading" | "investing";
  to: "main" | "trading" | "investing";
  transfer: (from: any, to: any, amount: number) => boolean;
  wallets: { main: number; trading: number; investing: number };
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fromLabel = from.charAt(0).toUpperCase() + from.slice(1);
  const toLabel = to.charAt(0).toUpperCase() + to.slice(1);
  const available = wallets[from];
  const parsedAmount = parseFloat(amount);

  const handleTransfer = () => {
    setError("");
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (parsedAmount > available) {
      setError("Insufficient balance.");
      return;
    }
    const ok = transfer(from, to, parsedAmount);
    if (ok) setSuccess(true);
    else setError("Transfer failed. Please try again.");
  };

  const handleClose = () => {
    setAmount("");
    setError("");
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>{success ? "Transfer Successful" : "Transfer Funds"}</h2>
          <button className={styles.modal_close} onClick={handleClose}>
            <IconX size={18} />
          </button>
        </div>

        {success ? (
          <div className={styles.modal_success}>
            <div className={styles.modal_success_icon}>✓</div>
            <p className={styles.modal_success_msg}>
              ${parsedAmount.toFixed(2)} transferred from {fromLabel} to{" "}
              {toLabel} Wallet.
            </p>
            <Button variant="fill-red" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.transfer_route}>
              <span
                className={`${styles.route_tag} ${styles[`route_${from}`]}`}
              >
                {fromLabel}
              </span>
              <IconArrowRight size={16} className={styles.route_arrow} />
              <span className={`${styles.route_tag} ${styles[`route_${to}`]}`}>
                {toLabel}
              </span>
            </div>

            <div className={styles.transfer_info}>
              <p className={styles.transfer_label}>
                Available Balance
              </p>
              <p className={styles.transfer_balance}>
                $
                {available.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                USD
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
                    setAmount(val);
                    setError("");
                  }
                }}

                className={styles.transfer_input}
              />
              {error && <p className={styles.transfer_error}>{error}</p>}
            </div>

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

export const DestinationModal = ({ isOpen, onClose, source, onSelect }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const options = [
    { id: "main", label: "Main Wallet", icon: <IconBusinessplan size={24} /> },
    { id: "trading", label: "Trading Wallet", icon: <IconTrendingUp size={24} /> },
    { id: "investing", label: "Investing Wallet", icon: <IconChartBar size={24} /> },
  ].filter(opt => opt.id !== source);

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={e => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>Select Destination</h2>
          <button onClick={onClose} className={styles.close_btn}><IconX size={20} /></button>
        </div>

        <div className={styles.selection_grid}>
          {options.map(opt => (
            <div
              key={opt.id}
              className={`${styles.selection_card} ${selectedId === opt.id ? styles.active : ''}`}
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

        <Button fullWidth children={"Continue to transfer"} disabled={!selectedId} onClick={() => onSelect(selectedId)} />


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
