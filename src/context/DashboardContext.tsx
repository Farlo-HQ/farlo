"use client";
import { createContext, useContext, useState } from "react";

export type Mode = "trading" | "investing";

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer_in" | "transfer_out" | "trade";
  wallet: "main" | "trading" | "investing";
  label: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

interface WalletState {
  main: number;
  trading: number;
  investing: number;
}

interface DashboardContextType {
  mode: Mode;
  setMode: (m: Mode) => void;
  wallets: WalletState;
  transfer: (
    from: "main" | "trading" | "investing",
    to: "main" | "trading" | "investing",
    amount: number
  ) => boolean;
  deposit: (amount: number) => void;
  transactions: Transaction[];
  notifications: Notification[];
  markAllRead: () => void;
  unreadCount: number;
  kycStatus: "pending" | "submitted" | "approved";
  setKycStatus: (s: "pending" | "submitted" | "approved") => void;
}

const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    type: "deposit",
    wallet: "main",
    label: "Bank Transfer Deposit",
    amount: 500,
    date: "2026-03-23T09:14:00",
    status: "completed",
  },
  {
    id: "t2",
    type: "transfer_out",
    wallet: "main",
    label: "Transfer to Trading Wallet",
    amount: 200,
    date: "2026-03-23T09:20:00",
    status: "completed",
  },
  {
    id: "t3",
    type: "transfer_in",
    wallet: "trading",
    label: "Received from Main Wallet",
    amount: 200,
    date: "2026-03-23T09:20:00",
    status: "completed",
  },
  {
    id: "t4",
    type: "trade",
    wallet: "trading",
    label: "EUR/USD Position Closed",
    amount: 84.5,
    date: "2026-03-22T16:32:00",
    status: "completed",
  },
  {
    id: "t5",
    type: "transfer_out",
    wallet: "main",
    label: "Transfer to Investing Wallet",
    amount: 1000,
    date: "2026-03-22T14:10:00",
    status: "completed",
  },
  {
    id: "t6",
    type: "transfer_in",
    wallet: "investing",
    label: "Received from Main Wallet",
    amount: 1000,
    date: "2026-03-22T14:10:00",
    status: "completed",
  },
  {
    id: "t7",
    type: "trade",
    wallet: "investing",
    label: "AAPL Stock Purchase",
    amount: -340,
    date: "2026-03-20T11:00:00",
    status: "completed",
  },
  {
    id: "t8",
    type: "deposit",
    wallet: "main",
    label: "Card Deposit",
    amount: 250,
    date: "2026-03-19T08:45:00",
    status: "completed",
  },
  {
    id: "t9",
    type: "withdrawal",
    wallet: "main",
    label: "Bank Withdrawal",
    amount: -100,
    date: "2026-03-18T15:22:00",
    status: "pending",
  },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "KYC Verification Pending",
    message: "Complete your identity verification to unlock all features.",
    time: "Just now",
    read: false,
    type: "warning",
  },
  {
    id: "n2",
    title: "Transfer Successful",
    message: "$200.00 transferred to your Trading Wallet.",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: "n3",
    title: "Deposit Confirmed",
    message: "Your deposit of $500.00 has been confirmed.",
    time: "Today, 9:14 AM",
    read: false,
    type: "success",
  },
  {
    id: "n4",
    title: "Welcome to Farlo",
    message: "Your account has been created. Start by completing your profile.",
    time: "Yesterday",
    read: true,
    type: "info",
  },
];

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<Mode>("trading");
  const [wallets, setWallets] = useState<WalletState>({
    main: 12450,
    trading: 5200,
    investing: 3800,
  });
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [kycStatus, setKycStatus] = useState<
    "pending" | "submitted" | "approved"
  >("pending");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const transfer = (
    from: "main" | "trading" | "investing",
    to: "main" | "trading" | "investing",
    amount: number
  ): boolean => {
    if (wallets[from] < amount) return false;

    setWallets((prev) => ({
      ...prev,
      [from]: prev[from] - amount,
      [to]: prev[to] + amount,
    }));

    const newTx: Transaction = {
      id: `t${Date.now()}`,
      type: "transfer_out",
      wallet: from,
      label: `Transfer to ${to.charAt(0).toUpperCase() + to.slice(1)} Wallet`,
      amount,
      date: new Date().toISOString(),
      status: "completed",
    };

    const newTxIn: Transaction = {
      id: `t${Date.now() + 1}`,
      type: "transfer_in",
      wallet: to,
      label: `Received from ${from.charAt(0).toUpperCase() + from.slice(1)} Wallet`,
      amount,
      date: new Date().toISOString(),
      status: "completed",
    };

    setTransactions((prev) => [newTxIn, newTx, ...prev]);

    const notif: Notification = {
      id: `n${Date.now()}`,
      title: "Transfer Successful",
      message: `$${amount.toFixed(2)} transferred to your ${to.charAt(0).toUpperCase() + to.slice(1)} Wallet.`,
      time: "Just now",
      read: false,
      type: "success",
    };
    setNotifications((prev) => [notif, ...prev]);

    return true;
  };

  const deposit = (amount: number) => {
    setWallets((prev) => ({ ...prev, main: prev.main + amount }));

    const newTx: Transaction = {
      id: `t${Date.now()}`,
      type: "deposit",
      wallet: "main",
      label: "Deposit to Main Wallet",
      amount,
      date: new Date().toISOString(),
      status: "completed",
    };

    setTransactions((prev) => [newTx, ...prev]);

    const notif: Notification = {
      id: `n${Date.now()}`,
      title: "Deposit Confirmed",
      message: `Your deposit of $${amount.toFixed(2)} has been confirmed.`,
      time: "Just now",
      read: false,
      type: "success",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <DashboardContext.Provider
      value={{
        mode,
        setMode,
        wallets,
        transfer,
        deposit,
        transactions,
        notifications,
        markAllRead,
        unreadCount,
        kycStatus,
        setKycStatus,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);