"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import {
  IconX,
  IconCreditCard,
  IconPlus,
  IconTrash,
  IconCheck,
  IconLock,
} from "@tabler/icons-react";

interface SavedCard {
  id: string;
  last4: string;
  brand: "visa" | "mastercard" | "verve";
  name: string;
  expiry: string;
  isDefault: boolean;
}

const INITIAL_CARDS: SavedCard[] = [];

const BRAND_COLORS: Record<string, string> = {
  visa: "linear-gradient(135deg, #1a1f71 0%, #283593 100%)",
  mastercard: "linear-gradient(135deg, #eb5757 0%, #b91c1c 100%)",
  verve: "linear-gradient(135deg, #CB1A36 0%, #7f0e1e 100%)",
};

const BRAND_LABEL: Record<string, string> = {
  visa: "VISA",
  mastercard: "Mastercard",
  verve: "Verve",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedCardsModal = ({ isOpen, onClose }: Props) => {
  const [cards, setCards] = useState<SavedCard[]>(INITIAL_CARDS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [formErrors, setFormErrors] = useState<Partial<typeof form>>({});
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const detectBrand = (num: string): "visa" | "mastercard" | "verve" => {
    const clean = num.replace(/\s/g, "");
    if (clean.startsWith("4")) return "visa";
    if (clean.startsWith("5") || clean.startsWith("2")) return "mastercard";
    return "verve";
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (form.number.replace(/\s/g, "").length < 16) e.number = "Invalid card number";
    if (!form.name.trim()) e.name = "Required";
    if (form.expiry.length < 5) e.expiry = "Invalid expiry";
    if (form.cvv.length < 3) e.cvv = "Invalid CVV";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const newCard: SavedCard = {
      id: Date.now().toString(),
      last4: form.number.replace(/\s/g, "").slice(-4),
      brand: detectBrand(form.number),
      name: form.name.toUpperCase(),
      expiry: form.expiry,
      isDefault: cards.length === 0,
    };
    setCards((prev) => [...prev, newCard]);
    setForm({ number: "", name: "", expiry: "", cvv: "" });
    setFormErrors({});
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowAdd(false); }, 1500);
  };

  const handleDelete = (id: string) => {
    setCards((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      if (remaining.length > 0 && !remaining.some((c) => c.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
  };

  const setDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <div>
            <h2 className={styles.modal_title}>Payment Cards</h2>
            <p className={styles.modal_sub}>Manage your saved cards for deposits</p>
          </div>
          <button className={styles.close_btn} onClick={onClose}><IconX size={18} /></button>
        </div>

        {/* Saved cards */}
        {!showAdd && (
          <div className={styles.cards_section}>
            {cards.length === 0 ? (
              <div className={styles.empty_state}>
                <IconCreditCard size={32} strokeWidth={1.2} />
                <p>No cards saved yet</p>
                <span>Add a card for faster deposits</span>
              </div>
            ) : (
              <div className={styles.cards_list}>
                {cards.map((card) => (
                  <div key={card.id} className={`${styles.card_item} ${card.isDefault ? styles.card_default : ""}`}>
                    {/* Mini card visual */}
                    <div
                      className={styles.mini_card}
                      style={{ background: BRAND_COLORS[card.brand] }}
                    >
                      <div className={styles.mini_card_chip} />
                      <p className={styles.mini_card_num}>•••• {card.last4}</p>
                      <div className={styles.mini_card_bottom}>
                        <span>{card.name}</span>
                        <span>{card.expiry}</span>
                      </div>
                      <span className={styles.mini_card_brand}>{BRAND_LABEL[card.brand]}</span>
                    </div>

                    <div className={styles.card_meta}>
                      <p className={styles.card_title_text}>
                        {BRAND_LABEL[card.brand]} ending in {card.last4}
                      </p>
                      <p className={styles.card_sub_text}>Expires {card.expiry} · {card.name}</p>
                      {card.isDefault && (
                        <span className={styles.default_badge}>
                          <IconCheck size={10} /> Default
                        </span>
                      )}
                    </div>

                    <div className={styles.card_actions}>
                      {!card.isDefault && (
                        <button className={styles.set_default_btn} onClick={() => setDefault(card.id)}>
                          Set default
                        </button>
                      )}
                      <button className={styles.delete_btn} onClick={() => handleDelete(card.id)}>
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className={styles.add_card_btn} onClick={() => setShowAdd(true)}>
              <IconPlus size={16} /> Add New Card
            </button>
          </div>
        )}

        {/* Add card form */}
        {showAdd && (
          <div className={styles.add_form}>
            {/* Live card preview */}
            <div
              className={styles.card_preview}
              style={{ background: BRAND_COLORS[detectBrand(form.number)] }}
            >
              <div className={styles.card_preview_top}>
                <div className={styles.card_chip_preview} />
                <span className={styles.card_brand_preview}>
                  {BRAND_LABEL[detectBrand(form.number)]}
                </span>
              </div>
              <p className={styles.card_number_preview}>
                {form.number || "•••• •••• •••• ••••"}
              </p>
              <div className={styles.card_bottom_preview}>
                <span>{form.name || "CARDHOLDER NAME"}</span>
                <span>{form.expiry || "MM/YY"}</span>
              </div>
            </div>

            {saved ? (
              <div className={styles.saved_banner}>
                <IconCheck size={16} /> Card saved successfully
              </div>
            ) : (
              <div className={styles.form_fields}>
                <div className={styles.field}>
                  <label>Card Number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={form.number}
                    maxLength={19}
                    className={formErrors.number ? styles.field_err : ""}
                    onChange={(e) => setForm(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                  />
                  {formErrors.number && <span className={styles.err_msg}>{formErrors.number}</span>}
                </div>

                <div className={styles.field}>
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="As it appears on card"
                    value={form.name}
                    className={formErrors.name ? styles.field_err : ""}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                  />
                  {formErrors.name && <span className={styles.err_msg}>{formErrors.name}</span>}
                </div>

                <div className={styles.field_row}>
                  <div className={styles.field}>
                    <label>Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={form.expiry}
                      maxLength={5}
                      className={formErrors.expiry ? styles.field_err : ""}
                      onChange={(e) => setForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    />
                    {formErrors.expiry && <span className={styles.err_msg}>{formErrors.expiry}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>CVV</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      placeholder="•••"
                      value={form.cvv}
                      maxLength={4}
                      className={formErrors.cvv ? styles.field_err : ""}
                      onChange={(e) => setForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))}
                    />
                    {formErrors.cvv && <span className={styles.err_msg}>{formErrors.cvv}</span>}
                  </div>
                </div>

                <div className={styles.security_note}>
                  <IconLock size={12} /> Card details are encrypted and never stored in plain text
                </div>

                <div className={styles.form_actions}>
                  <button className={styles.cancel_btn} onClick={() => { setShowAdd(false); setFormErrors({}); }}>
                    Cancel
                  </button>
                  <button className={styles.save_btn} onClick={handleAdd}>
                    Save Card
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};