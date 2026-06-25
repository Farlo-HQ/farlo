
"use client";
import styles from "@/modules/overview/styles.module.scss";
import accStyles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import {
  IconShieldCheck,
  IconTrendingUp,
  IconChartBar,
  IconWallet,
  IconClock,
  IconCircleCheck,
  IconAlertCircle,
  IconChevronRight,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconLock,
  IconCheck,
  IconX,
  IconPlus,
  IconCreditCard,
} from "@tabler/icons-react";
import { IoPerson } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface ProfileDetails {
  phone: string | null;
  country: string | null;
  created_at: string | null;
}

const AccountsUI = () => {
  const { userProfile, kycStatus, wallets, transactions, mode } = useDashboard();
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [details, setDetails] = useState<ProfileDetails | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!userProfile?.id) return;
      const { data } = await supabase
        .from("profiles")
        .select("phone, country, created_at")
        .eq("id", userProfile.id)
        .single();
      setDetails(data);
    };
    load();
  }, [userProfile?.id]);

  const displayName = userProfile?.firstName
    ? `${userProfile.firstName}${userProfile.lastName ? ` ${userProfile.lastName}` : ""}`
    : userProfile?.email?.split("@")[0] ?? "User";

  const initials = userProfile?.firstName
    ? `${userProfile.firstName[0]}${userProfile.lastName ? userProfile.lastName[0] : ""}`.toUpperCase()
    : null;

  const totalDeposited = transactions
    .filter((t) => t.type === "deposit")
    .reduce((s, t) => s + t.amount, 0);

  const totalWithdrawn = Math.abs(
    transactions
      .filter((t) => t.type === "withdrawal")
      .reduce((s, t) => s + t.amount, 0)
  );

  const totalBalance = wallets.main + wallets.trading + wallets.investing;

  const kycLabel =
    kycStatus === "approved"
      ? "Verified"
      : kycStatus === "submitted"
        ? "Under Review"
        : "Not Verified";

  const kycColor =
    kycStatus === "approved"
      ? "#1a9e75"
      : kycStatus === "submitted"
        ? "#b45309"
        : "#CB1A36";

  const KycIcon =
    kycStatus === "approved"
      ? IconCircleCheck
      : kycStatus === "submitted"
        ? IconClock
        : IconAlertCircle;

  const memberSince = details?.created_at
    ? new Date(details.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <section className={accStyles.body}>
      {/* Header */}
      <div className={styles.greeting}>
        <h1 className={styles.title}>My Account</h1>
        <p className={styles.subtitle}>
          Manage your profile, account status, and security settings.
        </p>
      </div>

      <div className={accStyles.grid}>
        <div className={accStyles.card}>
          <div className={accStyles.card_header}>
            <h3 className={accStyles.card_title}>Profile</h3>
          </div>

          <div className={accStyles.profile_avatar_row}>
            <div className={accStyles.avatar_circle}>
              {initials ? initials : <IoPerson />}
            </div>
            <div>
              <p className={accStyles.profile_name}>{displayName}</p>
              <p className={accStyles.profile_sub}>{userProfile?.email}</p>
            </div>
          </div>

          <div className={accStyles.info_list}>
            <div className={accStyles.info_row}>
              <IconMail size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Email</span>
              <span className={accStyles.info_value}>{userProfile?.email ?? "—"}</span>
            </div>
            <div className={accStyles.info_row}>
              <IconPhone size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Phone</span>
              <span className={accStyles.info_value}>{details?.phone || "Not provided"}</span>
            </div>
            <div className={accStyles.info_row}>
              <IconMapPin size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Country</span>
              <span className={accStyles.info_value}>
                {details?.country ? details.country.charAt(0).toUpperCase() + details.country.slice(1) : "Not provided"}
              </span>
            </div>
            <div className={accStyles.info_row}>
              <IconUser size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Account type</span>
              <span className={accStyles.info_value}>
                {mode === "trading" ? "Live Trading" : "Investing"}
              </span>
            </div>
            <div className={accStyles.info_row}>
              <IconCalendar size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Member since</span>
              <span className={accStyles.info_value}>{memberSince}</span>
            </div>
          </div>
        </div>

        {/* KYC Status card */}
        <div className={accStyles.card}>
          <div className={accStyles.card_header}>
            <h3 className={accStyles.card_title}>Identity Verification</h3>
          </div>

          <div className={accStyles.kyc_status_row}>
            <div className={accStyles.kyc_status_icon} style={{ background: kycColor + "18", color: kycColor }}>
              <KycIcon size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className={accStyles.kyc_status_label} style={{ color: kycColor }}>{kycLabel}</p>
              <p className={accStyles.kyc_status_sub}>
                {kycStatus === "approved"
                  ? "Your identity has been verified. Full access unlocked."
                  : kycStatus === "submitted"
                    ? "We are reviewing your documents. This takes 24–48 hours."
                    : "Complete KYC to unlock deposits, withdrawals and full trading access."}
              </p>
            </div>
          </div>

          {kycStatus === "pending" && (
            <button
              className={accStyles.kyc_cta}
              onClick={() => router.push("/kyc")}
            >
              <IconShieldCheck size={15} />
              Start Verification
              <IconChevronRight size={14} />
            </button>
          )}

          <div className={accStyles.kyc_checklist}>
            <KycCheckItem done={kycStatus !== "pending"} label="Personal information submitted" />
            <KycCheckItem done={kycStatus !== "pending"} label="Government ID uploaded" />
            <KycCheckItem done={kycStatus !== "pending"} label="Facial verification completed" />
            <KycCheckItem done={kycStatus === "approved"} label="Identity approved" />
          </div>
        </div>

        <div className={accStyles.card}>
          <div className={accStyles.card_header}>
            <h3 className={accStyles.card_title}>Account Summary</h3>
          </div>

          <div className={accStyles.summary_stats}>
            <div className={accStyles.summary_stat}>
              <IconWallet size={18} strokeWidth={1.5} className={accStyles.summary_icon} />
              <div>
                <p className={accStyles.summary_label}>Total Balance</p>
                <p className={accStyles.summary_value}>
                  ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className={accStyles.summary_stat}>
              <IconTrendingUp size={18} strokeWidth={1.5} className={accStyles.summary_icon} />
              <div>
                <p className={accStyles.summary_label}>Total Deposited</p>
                <p className={accStyles.summary_value}>
                  ${totalDeposited.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className={accStyles.summary_stat}>
              <IconChartBar size={18} strokeWidth={1.5} className={accStyles.summary_icon} />
              <div>
                <p className={accStyles.summary_label}>Total Withdrawn</p>
                <p className={accStyles.summary_value}>
                  ${totalWithdrawn.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className={accStyles.summary_stat}>
              <IconChartBar size={18} strokeWidth={1.5} className={accStyles.summary_icon} />
              <div>
                <p className={accStyles.summary_label}>Transactions</p>
                <p className={accStyles.summary_value}>{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security card */}
        <div className={accStyles.card}>
          <div className={accStyles.card_header}>
            <h3 className={accStyles.card_title}>Security</h3>
          </div>

          <div className={accStyles.security_list}>
            <div className={accStyles.security_row}>
              <div className={accStyles.security_left}>
                <IconMail size={16} strokeWidth={1.5} />
                <div>
                  <p className={accStyles.security_label}>Email address</p>
                  <p className={accStyles.security_sub}>{userProfile?.email}</p>
                </div>
              </div>
              <span className={accStyles.security_badge_verified}>Verified</span>
            </div>

            <div className={accStyles.security_row}>
              <div className={accStyles.security_left}>
                <IconLock size={16} strokeWidth={1.5} />
                <div>
                  <p className={accStyles.security_label}>Password</p>
                  <p className={accStyles.security_sub}>Last changed: Not set</p>
                </div>
              </div>
              <button className={accStyles.security_action} onClick={() => setShowPasswordModal(true)}>Edit</button>
            </div>

            <div className={accStyles.security_row}>
              <div className={accStyles.security_left}>
                <IconPhone size={16} strokeWidth={1.5} />
                <div>
                  <p className={accStyles.security_label}>Two-factor authentication</p>
                  <p className={accStyles.security_sub}>Adds an extra layer of security</p>
                </div>
              </div>
              <button className={accStyles.security_action}>Enable</button>
            </div>
          </div>
        </div>

        {/* Linked Accounts — merged in from the old Profile page */}
        <div className={accStyles.card}>
          <div className={accStyles.card_header}>
            <div>
              <h3 className={accStyles.card_title}>Linked Accounts</h3>
              <p className={accStyles.card_sub_header}>Connect external accounts for faster funding and withdrawals.</p>
            </div>
          </div>

          <div className={accStyles.linked_list}>
            <button className={accStyles.linked_add_row}>
              <span className={accStyles.linked_add_icon}><IconCreditCard size={16} /></span>
              <span className={accStyles.linked_add_text}>Add a debit or credit card</span>
              <IconPlus size={16} className={accStyles.linked_add_plus} />
            </button>
            <button className={accStyles.linked_add_row}>
              <span className={accStyles.linked_add_icon}><IconMapPin size={16} /></span>
              <span className={accStyles.linked_add_text}>Add a bank account</span>
              <IconPlus size={16} className={accStyles.linked_add_plus} />
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </section>
  );
};

const KycCheckItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className={accStyles.check_item}>
    <div className={`${accStyles.check_dot} ${done ? accStyles.check_dot_done : ""}`}>
      {done && <IconCheck size={20} style={{ padding: 1.5 }} />}
    </div>
    <p className={`${accStyles.check_label} ${done ? accStyles.check_label_done : ""}`}>{label}</p>
  </div>
);

const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      setLoading(false);
      setError("Could not verify your session. Please log in again.");
      return;
    }

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (reauthError) {
      setLoading(false);
      setError("Current password is incorrect.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className={accStyles.modal_overlay}>
      <div className={accStyles.modal_box}>
        {success ? (
          <div className={accStyles.modal_success}>
            <div className={accStyles.success_icon_sm}><IconCheck size={28} /></div>
            <h3>Password Updated</h3>
            <p>Your password has been changed successfully.</p>
            <button className={accStyles.modal_btn_primary} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className={accStyles.modal_header}>
              <h3>Change Password</h3>
              <button onClick={onClose} className={accStyles.modal_close}><IconX size={18} /></button>
            </div>

            {error && (
              <div className={accStyles.modal_error}>
                <IconAlertCircle size={14} /> {error}
              </div>
            )}

            <div className={accStyles.modal_field}>
              <label>Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled={loading} />
            </div>
            <div className={accStyles.modal_field}>
              <label>New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={loading} />
            </div>
            <div className={accStyles.modal_field}>
              <label>Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
            </div>

            <button className={accStyles.modal_btn_primary} onClick={handleSubmit} disabled={loading}>
              {loading ? "Updating…" : "Update Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { AccountsUI };