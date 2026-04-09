"use client";
import { useEffect, useRef, useState } from "react";
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
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components";

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
      return <IconArrowDownLeft size={20} strokeWidth={1.5} />;
    case "withdrawal":
      return <IconArrowUpRight size={20} strokeWidth={1.5} />;
    case "transfer_in":
    case "transfer_out":
      return <IconRefresh size={20} strokeWidth={1.5} />;
    case "trade":
      return <IconChartBar size={20} strokeWidth={1.5} />;
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

const receiptAmount = (tx: Transaction) => {
  const abs = Math.abs(tx.amount);

  return `$${abs.toFixed(2)}`;
};


const TransactionsUI = () => {
  const { transactions } = useDashboard();
  const [filter, setFilter] = useState<Filter>("all");
  const [walletFilter, setWalletFilter] = useState<WalletFilter>("all");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  type DateFilter = "all" | "today" | "7d" | "30d" | "this_month";

  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [dateOpen, setDateOpen] = useState(false);

  const closeDetails = () => setSelectedTx(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);



  const filtered = transactions.filter((tx) => {
    const matchType = filter === "all" || tx.type === filter;
    const matchWallet = walletFilter === "all" || tx.wallet === walletFilter;
    const matchSearch = search.trim() === "" || tx.label.toLowerCase().includes(search.toLowerCase());

    const txDate = new Date(tx.date);
    const now = new Date();
    let matchDate = true;

    if (dateFilter === "today") {
      matchDate = txDate.toDateString() === now.toDateString();
    } else if (dateFilter === "7d") {
      const sevenDaysAgo = new Date().setDate(now.getDate() - 7);
      matchDate = txDate.getTime() >= sevenDaysAgo;
    } else if (dateFilter === "30d") {
      const thirtyDaysAgo = new Date().setDate(now.getDate() - 30);
      matchDate = txDate.getTime() >= thirtyDaysAgo;
    }

    return matchType && matchWallet && matchSearch && matchDate;
  });

  const TYPE_FILTERS: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "deposit", label: "Deposits" },
    { value: "withdrawal", label: "Withdrawals" },
    { value: "transfer_in", label: "Received" },
    { value: "transfer_out", label: "Sent" },
    { value: "trade", label: "Trades" },
  ];

  const totalIn = transactions
    .filter((t) => t.type === "deposit" || t.type === "transfer_in")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalOut = transactions
    .filter((t) => t.type === "withdrawal" || t.type === "transfer_out")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

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

      <div className={styles.summary_row}>
        <div className={`${styles.summary_card} ${styles.summary_card_green}`}>
          <p className={styles.summary_label}>Total In</p>
          <p className={styles.summary_value}>
            ${totalIn.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className={styles.summary_sub}>Deposits & transfers received</p>
        </div>
        <div className={`${styles.summary_card} ${styles.summary_card_blue}`}>
          <p className={styles.summary_label}>Total Out</p>
          <p className={styles.summary_value}>
            ${totalOut.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className={styles.summary_sub}>Withdrawals & transfers sent</p>
        </div>
        <div className={`${styles.summary_card} ${styles.summary_card_pink}`}>
          <p className={styles.summary_label}>All Transactions</p>
          <p className={styles.summary_value}>{transactions.length}</p>
          <p className={styles.summary_sub}>Total records on account</p>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filters_top}>
          <div className={styles.search_wrap}>
            <IconSearch size={16} className={styles.search_icon} />
            <input
              className={styles.search_input}
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.filter_group}>
            <div className={styles.custom_dropdown_container} ref={dropdownRef}>
              <div
                className={styles.custom_select_trigger}
                onClick={() => setIsOpen(!isOpen)}
              >
                <IconFilter size={14} className={styles.select_icon} />
                <span>{walletFilter}</span>
                <IconChevronDown size={14} className={isOpen ? styles.rotate : ""} />
              </div>

              {isOpen && (
                <div className={styles.custom_options_list}>
                  {["all", "main", "trading", "investing"].map((opt) => (
                    <div
                      key={opt}
                      className={styles.custom_option}
                      onClick={() => {
                        setWalletFilter(opt as WalletFilter);
                        setIsOpen(false);
                      }}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

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
                <tr >
                  <th>Transaction</th>
                  <th>Wallet</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className={styles.amount_col}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className={styles.clickable_row}>
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


      {selectedTx && (
        <div className={styles.modal_overlay} onClick={closeDetails}>
          <div className={styles.detail_modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <h3>Transaction</h3>
              <button onClick={closeDetails} className={styles.close_btn} aria-label="Close">
                <IconX size={18} />
              </button>
            </div>

            <div className={styles.detail_body}>
              <div className={styles.receipt_header}>
                <div className={`${styles.detail_icon_big} ${txColor(selectedTx.type)}`}>
                  {txIcon(selectedTx.type)}
                </div>
                <div className={styles.detail_amount}>
                  {receiptAmount(selectedTx)}
                </div>
                <p
                  className={`${styles.detail_status_tag} ${selectedTx.status === "completed"
                    ? styles.status_completed
                    : selectedTx.status === "pending"
                      ? styles.status_pending
                      : styles.status_failed
                    }`}
                >
                  {selectedTx.status.toUpperCase()}
                </p>
              </div>

              <div className={styles.divider} />

              <div className={styles.detail_section}>
                <h4 className={styles.section_title}>Transaction Details</h4>
                <div className={styles.detail_row}>
                  <span>Description</span>
                  <p>{selectedTx.label}</p>
                </div>
                <div className={styles.detail_row}>
                  <span>Date & Time</span>
                  <p>{formatDate(selectedTx.date)}</p>
                </div>
                <div className={styles.detail_row}>
                  <span>Wallet</span>
                  <p>{selectedTx.wallet.charAt(0).toUpperCase() + selectedTx.wallet.slice(1)} Wallet</p>
                </div>
              </div>

              <div className={styles.detail_section}>
                <div className={styles.detail_row}>
                  <span>Subtotal</span>
                  <p>${Math.abs(selectedTx.amount).toFixed(2)}</p>
                </div>
                <div className={styles.detail_row}>
                  <span>Transaction Fee</span>
                  <p className={styles.fee_text}>$0.00 </p>
                </div>
                <div className={`${styles.detail_row} ${styles.total_row}`}>
                  <span>Total</span>
                  <p>{txAmount(selectedTx)}</p>
                </div>
              </div>

              <div className={styles.detail_section}>
                <div className={styles.detail_row}>
                  <span>Transaction ID</span>
                  <p className={styles.tx_id_text}>{selectedTx.id.toUpperCase()}</p>
                </div>
                <div className={styles.detail_row}>
                  <span>Reference</span>
                  <p>FLX-{selectedTx.id.split('-')[0] || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className={styles.modal_actions}>
              <Button variant="outline-red">Report an issue</Button>
              <Button variant="fill-red" onClick={closeDetails}>Done</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { TransactionsUI };