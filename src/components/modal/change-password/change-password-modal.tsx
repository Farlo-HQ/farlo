"use client";
import { useState } from "react";
import { IconX, IconLock, IconEye, IconEyeOff, IconCircleCheckFilled } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const strength = (() => {
    if (!newPass) return 0;
    let s = 0;
    if (newPass.length >= 8) s++;
    if (/[A-Z]/.test(newPass)) s++;
    if (/[0-9]/.test(newPass)) s++;
    if (/[^A-Za-z0-9]/.test(newPass)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#1a9e75"][strength];

  const handleClose = () => {
    setCurrent(""); setNewPass(""); setConfirm("");
    setError(""); setSuccess(false); setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    setError("");

    if (!current.trim()) { setError("Please enter your current password."); return; }
    if (newPass.length < 8) { setError("New password must be at least 8 characters."); return; }
    if (newPass !== confirm) { setError("Passwords do not match."); return; }
    if (current === newPass) { setError("New password must be different from current password."); return; }

    setLoading(true);

    // Re-authenticate by signing in again to verify current password
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) { setError("Session error. Please log in again."); setLoading(false); return; }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: current,
    });

    if (signInError) {
      setError("Current password is incorrect.");
      setLoading(false);
      return;
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPass });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
    setTimeout(handleClose, 2500);
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <div className={styles.header_icon}>
            <IconLock size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className={styles.modal_title}>Change Password</h2>
            <p className={styles.modal_sub}>Update your account password</p>
          </div>
          <button className={styles.close_btn} onClick={handleClose}>
            <IconX size={16} />
          </button>
        </div>

        {success ? (
          <div className={styles.success_state}>
            <IconCircleCheckFilled size={44} />
            <p>Password updated successfully</p>
            <span>You can now log in with your new password.</span>
          </div>
        ) : (
          <div className={styles.form}>
            {error && <div className={styles.error_banner}>{error}</div>}

            <PasswordField
              label="Current Password"
              value={current}
              show={showCurrent}
              onToggle={() => setShowCurrent(p => !p)}
              onChange={(v) => { setCurrent(v); setError(""); }}
              placeholder="Enter current password"
            />

            <div className={styles.divider} />

            <PasswordField
              label="New Password"
              value={newPass}
              show={showNew}
              onToggle={() => setShowNew(p => !p)}
              onChange={(v) => { setNewPass(v); setError(""); }}
              placeholder="Min. 8 characters"
            />

            {newPass.length > 0 && (
              <div className={styles.strength_wrap}>
                <div className={styles.strength_bars}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={styles.strength_bar}
                      style={{ background: i <= strength ? strengthColor : "var(--dash-border)" }}
                    />
                  ))}
                </div>
                <span className={styles.strength_label} style={{ color: strengthColor }}>
                  {strengthLabel}
                </span>
              </div>
            )}

            <PasswordField
              label="Confirm New Password"
              value={confirm}
              show={showConfirm}
              onToggle={() => setShowConfirm(p => !p)}
              onChange={(v) => { setConfirm(v); setError(""); }}
              placeholder="Repeat new password"
            />

            {confirm && newPass && (
              <p className={styles.match_note} style={{ color: newPass === confirm ? "#1a9e75" : "#ef4444" }}>
                {newPass === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
              </p>
            )}

            <div className={styles.requirements}>
              <p className={styles.req_title}>Password requirements</p>
              {[
                { label: "At least 8 characters", met: newPass.length >= 8 },
                { label: "One uppercase letter", met: /[A-Z]/.test(newPass) },
                { label: "One number", met: /[0-9]/.test(newPass) },
                { label: "One special character", met: /[^A-Za-z0-9]/.test(newPass) },
              ].map((r) => (
                <div key={r.label} className={styles.req_item}>
                  <span className={`${styles.req_dot} ${r.met ? styles.req_met : ""}`} />
                  <span className={`${styles.req_label} ${r.met ? styles.req_label_met : ""}`}>{r.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.modal_actions}>
              <button className={styles.cancel_btn} onClick={handleClose}>Cancel</button>
              <button
                className={styles.submit_btn}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Updating…" : "Update Password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PasswordField = ({
  label, value, show, onToggle, onChange, placeholder,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <div className={styles.field}>
    <label>{label}</label>
    <div className={styles.input_wrap}>
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" className={styles.eye_btn} onClick={onToggle}>
        {show ? <IconEyeOff size={15} strokeWidth={1.6} /> : <IconEye size={15} strokeWidth={1.6} />}
      </button>
    </div>
  </div>
);