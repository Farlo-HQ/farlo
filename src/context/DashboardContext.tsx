"use client";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

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

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isNewUser: boolean;
}

interface DashboardContextType {
  mode: Mode;
  setMode: (m: Mode) => void;
  wallets: WalletState;
  setWallets: React.Dispatch<React.SetStateAction<WalletState>>;
  transfer: (from: "main" | "trading" | "investing", to: "main" | "trading" | "investing", amount: number) => Promise<boolean>;
  withdraw: (amount: number, fromWallet: "main" | "trading" | "investing", label?: string) => Promise<boolean>;
  deposit: (amount: number, label?: string) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  notifications: Notification[];
  markAllRead: () => void;
  unreadCount: number;
  kycStatus: "pending" | "submitted" | "approved";
  setKycStatus: (s: "pending" | "submitted" | "approved") => void;
  userProfile: UserProfile | null;
  loading: boolean;
  refetchWallets: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<Mode>("trading");
  const [wallets, setWallets] = useState<WalletState>({ main: 0, trading: 0, investing: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [kycStatus, setKycStatusState] = useState<"pending" | "submitted" | "approved">("pending");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") localStorage.setItem("farlo_mode", newMode);
  };

  const setKycStatus = (s: "pending" | "submitted" | "approved") => {
    setKycStatusState(s);
    if (typeof window !== "undefined" && userProfile?.id) {
      localStorage.setItem(`farlo_kyc_${userProfile.id}`, s);
    }
  };

  const refetchWallets = useCallback(async () => {
    if (!userProfile?.id) return;
    const { data } = await supabase
      .from("wallets")
      .select("main_balance, trading_balance, investing_balance")
      .eq("user_id", userProfile.id)
      .single();
    if (data) {
      setWallets({
        main: data.main_balance ?? 0,
        trading: data.trading_balance ?? 0,
        investing: data.investing_balance ?? 0,
      });
    }
  }, [userProfile?.id]);

  const refetchTransactions = useCallback(async () => {
    if (!userProfile?.id) return;
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userProfile.id)
      .order("date", { ascending: false });
    setTransactions(data ?? []);
  }, [userProfile?.id]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const user = session.user;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { count } = await supabase
        .from("transactions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);

      const isNewUser = !count || count === 0;

      setUserProfile({
        id: user.id,
        email: user.email ?? "",
        firstName: profile?.first_name ?? undefined,
        lastName: profile?.last_name ?? undefined,
        isNewUser,
      });

      const savedMode = profile?.default_mode ?? localStorage.getItem("farlo_mode");
      if (savedMode === "trading" || savedMode === "investing") setModeState(savedMode);

      const savedKyc = localStorage.getItem(`farlo_kyc_${user.id}`);
      if (savedKyc === "pending" || savedKyc === "submitted" || savedKyc === "approved") {
        setKycStatusState(savedKyc);
      }

      const { data: walletData } = await supabase
        .from("wallets")
        .select("main_balance, trading_balance, investing_balance")
        .eq("user_id", user.id)
        .single();

      if (walletData) {
        setWallets({
          main: walletData.main_balance ?? 0,
          trading: walletData.trading_balance ?? 0,
          investing: walletData.investing_balance ?? 0,
        });
      }

      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      setTransactions(txData ?? []);

      if (isNewUser) {
        setNotifications([
          { id: "n_welcome", title: "Welcome to Farlo", message: "Your account has been created. Start by completing your KYC verification.", time: "Just now", read: false, type: "info" },
          { id: "n_kyc", title: "KYC Verification Required", message: "Complete your identity verification to unlock full access.", time: "Just now", read: false, type: "warning" },
        ]);
      } else {
        setNotifications([
          { id: "n_welcome_back", title: "Welcome back", message: "You have successfully logged in.", time: "Just now", read: false, type: "success" },
        ]);
      }

      setLoading(false);
    };

    init();
  }, []);

  const addTransaction = useCallback(async (tx: Omit<Transaction, "id">) => {
    if (!userProfile?.id) return;
    const { data } = await supabase
      .from("transactions")
      .insert({ ...tx, user_id: userProfile.id })
      .select()
      .single();
    if (data) {
      setTransactions((prev) => [data, ...prev]);
    }
  }, [userProfile?.id]);

  const persistWallets = useCallback(async (newWallets: WalletState) => {
    if (!userProfile?.id) return;
    await supabase
      .from("wallets")
      .update({
        main_balance: newWallets.main,
        trading_balance: newWallets.trading,
        investing_balance: newWallets.investing,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userProfile.id);
  }, [userProfile?.id]);

  const deposit = useCallback(async (amount: number, label = "Deposit to Main Wallet") => {
    const newWallets = { ...wallets, main: wallets.main + amount };
    setWallets(newWallets);
    await persistWallets(newWallets);
    await addTransaction({
      type: "deposit",
      wallet: "main",
      label,
      amount,
      date: new Date().toISOString(),
      status: "completed",
    });
    setNotifications((prev) => [
      { id: `n${Date.now()}`, title: "Deposit Confirmed", message: `$${amount.toFixed(2)} added to your Main Wallet.`, time: "Just now", read: false, type: "success" },
      ...prev,
    ]);
  }, [wallets, persistWallets, addTransaction]);

  const withdraw = useCallback(async (amount: number, fromWallet: "main" | "trading" | "investing" = "main", label = "Withdrawal"): Promise<boolean> => {
    if (wallets[fromWallet] < amount) return false;
    const newWallets = { ...wallets, [fromWallet]: wallets[fromWallet] - amount };
    setWallets(newWallets);
    await persistWallets(newWallets);
    await addTransaction({
      type: "withdrawal",
      wallet: fromWallet,
      label,
      amount: -amount,
      date: new Date().toISOString(),
      status: "pending",
    });
    setNotifications((prev) => [
      { id: `n${Date.now()}`, title: "Withdrawal Submitted", message: `$${amount.toFixed(2)} withdrawal is being processed.`, time: "Just now", read: false, type: "info" },
      ...prev,
    ]);
    return true;
  }, [wallets, persistWallets, addTransaction]);

  const transfer = useCallback(async (
    from: "main" | "trading" | "investing",
    to: "main" | "trading" | "investing",
    amount: number
  ): Promise<boolean> => {
    if (wallets[from] < amount) return false;
    const newWallets = { ...wallets, [from]: wallets[from] - amount, [to]: wallets[to] + amount };
    setWallets(newWallets);
    await persistWallets(newWallets);

    const fromLabel = from.charAt(0).toUpperCase() + from.slice(1);
    const toLabel = to.charAt(0).toUpperCase() + to.slice(1);

    await addTransaction({ type: "transfer_out", wallet: from, label: `Transfer to ${toLabel} Wallet`, amount, date: new Date().toISOString(), status: "completed" });
    await addTransaction({ type: "transfer_in", wallet: to, label: `Received from ${fromLabel} Wallet`, amount, date: new Date().toISOString(), status: "completed" });

    setNotifications((prev) => [
      { id: `n${Date.now()}`, title: "Transfer Successful", message: `$${amount.toFixed(2)} moved from ${fromLabel} to ${toLabel} Wallet.`, time: "Just now", read: false, type: "success" },
      ...prev,
    ]);
    return true;
  }, [wallets, persistWallets, addTransaction]);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <DashboardContext.Provider value={{
      mode, setMode,
      wallets, setWallets,
      transfer, deposit, withdraw,
      transactions, addTransaction,
      notifications, markAllRead, unreadCount,
      kycStatus, setKycStatus,
      userProfile, loading,
      refetchWallets,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);