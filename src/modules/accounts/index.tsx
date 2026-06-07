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
} from "@tabler/icons-react";
import { IoPerson } from "react-icons/io5";

const AccountsUI = () => {
  const { userProfile, kycStatus, wallets, transactions, mode } = useDashboard();

  const displayName = userProfile?.firstName
    ? `${userProfile.firstName}${userProfile.lastName ? ` ${userProfile.lastName}` : ""}`
    : userProfile?.email?.split("@")[0] ?? "User";

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

              <IoPerson />
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
              <IconUser size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Account type</span>
              <span className={accStyles.info_value}>
                {mode === "trading" ? "Live Trading" : "Investing"}
              </span>
            </div>
            <div className={accStyles.info_row}>
              <IconCalendar size={15} strokeWidth={1.5} className={accStyles.info_icon} />
              <span className={accStyles.info_label}>Member since</span>
              <span className={accStyles.info_value}>
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
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
              onClick={() => (window.location.href = "/kyc")}
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

        {/* Account summary card */}
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
              <button className={accStyles.security_action}>Edit</button>
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
      </div>
    </section>
  );
};

const KycCheckItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className={accStyles.check_item}>
    <div className={`${accStyles.check_dot} ${done ? accStyles.check_dot_done : ""}`}>
      {done && <IconCircleCheck size={14} />}
    </div>
    <p className={`${accStyles.check_label} ${done ? accStyles.check_label_done : ""}`}>{label}</p>
  </div>
);

export { AccountsUI };