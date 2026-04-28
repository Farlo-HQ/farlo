"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useDashboard, Transaction } from "@/context/DashboardContext";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconRefresh,
  IconChartBar,
  IconFilter,
  IconSearch,
  IconChevronDown,
} from "@tabler/icons-react";

type Filter = "all" | "deposit" | "withdrawal" | "transfer_in" | "transfer_out" | "trade";
type WalletFilter = "all" | "main" | "trading" | "investing";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const txIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "deposit":
      return <IconArrowDownLeft size={16} strokeWidth={1.5} />;
    case "withdrawal":
      return <IconArrowUpRight size={16} strokeWidth={1.5} />;
    case "transfer_in":
    case "transfer_out":
      return <IconRefresh size={16} strokeWidth={1.5} />;
    case "trade":
      return <IconChartBar size={16} strokeWidth={1.5} />;
  }
};

const txColor = (type: Transaction["type"]) => {
  switch (type) {
    case "deposit":
    case "transfer_in":
      return styles.icon_green;
    case "withdrawal":
    case "transfer_out":
      return styles.icon_red;
    case "trade":
      return styles.icon_blue;
  }
};

const txAmount = (tx: Transaction) => {
  const isPositive =
    tx.type === "deposit" || tx.type === "transfer_in" || tx.amount > 0;
  const isNeutral = tx.type === "transfer_out" || tx.type === "withdrawal";
  const sign = isPositive && !isNeutral ? "+" : isNeutral ? "" : tx.amount > 0 ? "+" : "-";
  const abs = Math.abs(tx.amount);

  return (
    <span
      className={`${styles.tx_amount} ${isNeutral
        ? styles.neutral
        : isPositive
          ? styles.positive
          : styles.negative
        }`}
    >
      {sign}${abs.toFixed(2)}
    </span>
  );
};

const TransactionsUI = () => {
  const { transactions } = useDashboard();
  const [filter, setFilter] = useState<Filter>("all");
  const [walletFilter, setWalletFilter] = useState<WalletFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) => {
    const matchType = filter === "all" || tx.type === filter;
    const matchWallet = walletFilter === "all" || tx.wallet === walletFilter;
    const matchSearch =
      search.trim() === "" ||
      tx.label.toLowerCase().includes(search.toLowerCase());
    return matchType && matchWallet && matchSearch;
  });

  const TYPE_FILTERS: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "deposit", label: "Deposits" },
    { value: "withdrawal", label: "Withdrawals" },
    { value: "transfer_in", label: "Received" },
    { value: "transfer_out", label: "Sent" },
    { value: "trade", label: "Trades" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.page_header}>
        <div>
          <h1 className={styles.page_title}>Transaction History</h1>
          <p className={styles.page_sub}>
            A complete record of all your account activity
          </p>
        </div>
        <button className={styles.export_btn}>
          Export CSV
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.search_wrap}>
          <IconSearch size={16} className={styles.search_icon} />
          <input
            className={styles.search_input}
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filter_tabs}>
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filter_tab} ${filter === f.value ? styles.filter_tab_active : ""
                }`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.wallet_select_wrap}>
          <IconFilter size={14} className={styles.select_icon} />
          <select
            className={styles.wallet_select}
            value={walletFilter}
            onChange={(e) => setWalletFilter(e.target.value as WalletFilter)}
          >
            <option value="all">All Wallets</option>
            <option value="main">Main Wallet</option>
            <option value="trading">Trading Wallet</option>
            <option value="investing">Investing Wallet</option>
          </select>
          <IconChevronDown size={14} className={styles.select_chevron} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.empty_icon}>
            <IconChartBar size={32} strokeWidth={1.2} />
          </div>
          <p className={styles.empty_title}>No transactions found</p>
          <p className={styles.empty_sub}>
            Try adjusting your filters or make your first deposit to get
            started.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.table_wrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Wallet</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className={styles.amount_col}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className={styles.tx_info}>
                        <div className={`${styles.tx_icon} ${txColor(tx.type)}`}>
                          {txIcon(tx.type)}
                        </div>
                        <span className={styles.tx_label}>{tx.label}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.wallet_badge} ${styles[`badge_${tx.wallet}`]}`}>
                        {tx.wallet.charAt(0).toUpperCase() + tx.wallet.slice(1)}
                      </span>
                    </td>
                    <td className={styles.tx_date}>{formatDate(tx.date)}</td>
                    <td>
                      <span
                        className={`${styles.status_badge} ${tx.status === "completed"
                          ? styles.status_completed
                          : tx.status === "pending"
                            ? styles.status_pending
                            : styles.status_failed
                          }`}
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                    <td className={styles.amount_col}>{txAmount(tx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.table_footer}>
            <p className={styles.result_count}>
              Showing {filtered.length} of {transactions.length} transactions
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export { TransactionsUI };