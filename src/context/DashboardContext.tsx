// // "use client";
// // import { supabase } from "@/lib/supabase";
// // import { createContext, useContext, useState, useEffect, useCallback } from "react";

// // export type Mode = "trading" | "investing";

// // export interface Transaction {
// //   id: string;
// //   type: "deposit" | "withdrawal" | "transfer_in" | "transfer_out" | "trade";
// //   wallet: "main" | "trading" | "investing";
// //   label: string;
// //   amount: number;
// //   date: string;
// //   status: "completed" | "pending" | "failed";
// // }

// // export interface Notification {
// //   id: string;
// //   title: string;
// //   message: string;
// //   time: string;
// //   read: boolean;
// //   type: "info" | "success" | "warning";
// // }

// // interface WalletState {
// //   main: number;
// //   trading: number;
// //   investing: number;
// // }

// // export interface UserProfile {
// //   id: string;
// //   email: string;
// //   firstName?: string;
// //   lastName?: string;
// //   isNewUser: boolean;
// // }

// // interface DashboardContextType {
// //   mode: Mode;
// //   setMode: (m: Mode) => void;
// //   wallets: WalletState;
// //   setWallets: React.Dispatch<React.SetStateAction<WalletState>>;
// //   transfer: (from: "main" | "trading" | "investing", to: "main" | "trading" | "investing", amount: number) => Promise<boolean>;
// //   withdraw: (amount: number, fromWallet: "main" | "trading" | "investing", label?: string) => Promise<boolean>;
// //   deposit: (amount: number, label?: string) => void;
// //   transactions: Transaction[];
// //   addTransaction: (tx: Omit<Transaction, "id">) => void;
// //   notifications: Notification[];
// //   markAllRead: () => void;
// //   unreadCount: number;
// //   kycStatus: "pending" | "submitted" | "approved";
// //   setKycStatus: (s: "pending" | "submitted" | "approved") => void;
// //   userProfile: UserProfile | null;
// //   loading: boolean;
// //   refetchWallets: () => Promise<void>;
// // }

// // const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

// // export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [mode, setModeState] = useState<Mode>("trading");
// //   const [wallets, setWallets] = useState<WalletState>({ main: 0, trading: 0, investing: 0 });
// //   const [transactions, setTransactions] = useState<Transaction[]>([]);
// //   const [notifications, setNotifications] = useState<Notification[]>([]);
// //   const [kycStatus, setKycStatusState] = useState<"pending" | "submitted" | "approved">("pending");
// //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   const unreadCount = notifications.filter((n) => !n.read).length;

// //   const setMode = (newMode: Mode) => {
// //     setModeState(newMode);
// //     if (typeof window !== "undefined") localStorage.setItem("farlo_mode", newMode);
// //   };

// //   const setKycStatus = (s: "pending" | "submitted" | "approved") => {
// //     setKycStatusState(s);
// //     if (typeof window !== "undefined" && userProfile?.id) {
// //       localStorage.setItem(`farlo_kyc_${userProfile.id}`, s);
// //     }
// //   };

// //   const refetchWallets = useCallback(async () => {
// //     if (!userProfile?.id) return;
// //     const { data } = await supabase
// //       .from("wallets")
// //       .select("main_balance, trading_balance, investing_balance")
// //       .eq("user_id", userProfile.id)
// //       .single();
// //     if (data) {
// //       setWallets({
// //         main: data.main_balance ?? 0,
// //         trading: data.trading_balance ?? 0,
// //         investing: data.investing_balance ?? 0,
// //       });
// //     }
// //   }, [userProfile?.id]);

// //   const refetchTransactions = useCallback(async () => {
// //     if (!userProfile?.id) return;
// //     const { data } = await supabase
// //       .from("transactions")
// //       .select("*")
// //       .eq("user_id", userProfile.id)
// //       .order("date", { ascending: false });
// //     setTransactions(data ?? []);
// //   }, [userProfile?.id]);

// //   useEffect(() => {
// //     const init = async () => {
// //       setLoading(true);
// //       const { data: { session } } = await supabase.auth.getSession();
// //       if (!session) { setLoading(false); return; }

// //       const user = session.user;

// //       const { data: profile } = await supabase
// //         .from("profiles")
// //         .select("*")
// //         .eq("id", user.id)
// //         .single();

// //       const { count } = await supabase
// //         .from("transactions")
// //         .select("id", { count: "exact", head: true })
// //         .eq("user_id", user.id);

// //       const isNewUser = !count || count === 0;

// //       setUserProfile({
// //         id: user.id,
// //         email: user.email ?? "",
// //         firstName: profile?.first_name ?? undefined,
// //         lastName: profile?.last_name ?? undefined,
// //         isNewUser,
// //       });

// //       const savedMode = profile?.default_mode ?? localStorage.getItem("farlo_mode");
// //       if (savedMode === "trading" || savedMode === "investing") setModeState(savedMode);

// //       const savedKyc = localStorage.getItem(`farlo_kyc_${user.id}`);
// //       if (savedKyc === "pending" || savedKyc === "submitted" || savedKyc === "approved") {
// //         setKycStatusState(savedKyc);
// //       }

// //       const { data: walletData } = await supabase
// //         .from("wallets")
// //         .select("main_balance, trading_balance, investing_balance")
// //         .eq("user_id", user.id)
// //         .single();

// //       if (walletData) {
// //         setWallets({
// //           main: walletData.main_balance ?? 0,
// //           trading: walletData.trading_balance ?? 0,
// //           investing: walletData.investing_balance ?? 0,
// //         });
// //       }

// //       const { data: txData } = await supabase
// //         .from("transactions")
// //         .select("*")
// //         .eq("user_id", user.id)
// //         .order("date", { ascending: false });

// //       setTransactions(txData ?? []);

// //       if (isNewUser) {
// //         setNotifications([
// //           { id: "n_welcome", title: "Welcome to Farlo", message: "Your account has been created. Start by completing your KYC verification.", time: "Just now", read: false, type: "info" },
// //           { id: "n_kyc", title: "KYC Verification Required", message: "Complete your identity verification to unlock full access.", time: "Just now", read: false, type: "warning" },
// //         ]);
// //       } else {
// //         setNotifications([
// //           { id: "n_welcome_back", title: "Welcome back", message: "You have successfully logged in.", time: "Just now", read: false, type: "success" },
// //         ]);
// //       }

// //       setLoading(false);
// //     };

// //     init();
// //   }, []);

// //   const addTransaction = useCallback(async (tx: Omit<Transaction, "id">) => {
// //     if (!userProfile?.id) return;
// //     const { data } = await supabase
// //       .from("transactions")
// //       .insert({ ...tx, user_id: userProfile.id })
// //       .select()
// //       .single();
// //     if (data) {
// //       setTransactions((prev) => [data, ...prev]);
// //     }
// //   }, [userProfile?.id]);

// //   const persistWallets = useCallback(async (newWallets: WalletState) => {
// //     if (!userProfile?.id) return;
// //     await supabase
// //       .from("wallets")
// //       .update({
// //         main_balance: newWallets.main,
// //         trading_balance: newWallets.trading,
// //         investing_balance: newWallets.investing,
// //         updated_at: new Date().toISOString(),
// //       })
// //       .eq("user_id", userProfile.id);
// //   }, [userProfile?.id]);

// //   const deposit = useCallback(async (amount: number, label = "Deposit to Main Wallet") => {
// //     const newWallets = { ...wallets, main: wallets.main + amount };
// //     setWallets(newWallets);
// //     await persistWallets(newWallets);
// //     await addTransaction({
// //       type: "deposit",
// //       wallet: "main",
// //       label,
// //       amount,
// //       date: new Date().toISOString(),
// //       status: "completed",
// //     });
// //     setNotifications((prev) => [
// //       { id: `n${Date.now()}`, title: "Deposit Confirmed", message: `$${amount.toFixed(2)} added to your Main Wallet.`, time: "Just now", read: false, type: "success" },
// //       ...prev,
// //     ]);
// //   }, [wallets, persistWallets, addTransaction]);

// //   const withdraw = useCallback(async (amount: number, fromWallet: "main" | "trading" | "investing" = "main", label = "Withdrawal"): Promise<boolean> => {
// //     if (wallets[fromWallet] < amount) return false;
// //     const newWallets = { ...wallets, [fromWallet]: wallets[fromWallet] - amount };
// //     setWallets(newWallets);
// //     await persistWallets(newWallets);
// //     await addTransaction({
// //       type: "withdrawal",
// //       wallet: fromWallet,
// //       label,
// //       amount: -amount,
// //       date: new Date().toISOString(),
// //       status: "pending",
// //     });
// //     setNotifications((prev) => [
// //       { id: `n${Date.now()}`, title: "Withdrawal Submitted", message: `$${amount.toFixed(2)} withdrawal is being processed.`, time: "Just now", read: false, type: "info" },
// //       ...prev,
// //     ]);
// //     return true;
// //   }, [wallets, persistWallets, addTransaction]);

// //   const transfer = useCallback(async (
// //     from: "main" | "trading" | "investing",
// //     to: "main" | "trading" | "investing",
// //     amount: number
// //   ): Promise<boolean> => {
// //     if (wallets[from] < amount) return false;
// //     const newWallets = { ...wallets, [from]: wallets[from] - amount, [to]: wallets[to] + amount };
// //     setWallets(newWallets);
// //     await persistWallets(newWallets);

// //     const fromLabel = from.charAt(0).toUpperCase() + from.slice(1);
// //     const toLabel = to.charAt(0).toUpperCase() + to.slice(1);

// //     await addTransaction({ type: "transfer_out", wallet: from, label: `Transfer to ${toLabel} Wallet`, amount, date: new Date().toISOString(), status: "completed" });
// //     await addTransaction({ type: "transfer_in", wallet: to, label: `Received from ${fromLabel} Wallet`, amount, date: new Date().toISOString(), status: "completed" });

// //     setNotifications((prev) => [
// //       { id: `n${Date.now()}`, title: "Transfer Successful", message: `$${amount.toFixed(2)} moved from ${fromLabel} to ${toLabel} Wallet.`, time: "Just now", read: false, type: "success" },
// //       ...prev,
// //     ]);
// //     return true;
// //   }, [wallets, persistWallets, addTransaction]);

// //   const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

// //   return (
// //     <DashboardContext.Provider value={{
// //       mode, setMode,
// //       wallets, setWallets,
// //       transfer, deposit, withdraw,
// //       transactions, addTransaction,
// //       notifications, markAllRead, unreadCount,
// //       kycStatus, setKycStatus,
// //       userProfile, loading,
// //       refetchWallets,
// //     }}>
// //       {children}
// //     </DashboardContext.Provider>
// //   );
// // };

// // export const useDashboard = () => useContext(DashboardContext);

// "use client";
// import { supabase } from "@/lib/supabase";
// import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

// export type Mode = "trading" | "investing";

// export interface Transaction {
//   id: string;
//   type: "deposit" | "withdrawal" | "transfer_in" | "transfer_out" | "trade";
//   wallet: "main" | "trading" | "investing";
//   label: string;
//   amount: number;
//   date: string;
//   status: "completed" | "pending" | "failed";
// }

// export interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   time: string;
//   read: boolean;
//   type: "info" | "success" | "warning";
// }

// interface WalletState {
//   main: number;
//   trading: number;
//   investing: number;
// }

// export interface UserProfile {
//   id: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   isNewUser: boolean;
// }

// type WalletKey = "main" | "trading" | "investing";

// interface DashboardContextType {
//   mode: Mode;
//   setMode: (m: Mode) => void;
//   wallets: WalletState;
//   setWallets: React.Dispatch<React.SetStateAction<WalletState>>;
//   transfer: (from: WalletKey, to: WalletKey, amount: number) => Promise<boolean>;
//   deposit: (amount: number, label?: string) => Promise<void>;
//   withdraw: (amount: number, fromWallet: WalletKey, label?: string) => Promise<boolean>;
//   trade: (params: {
//     wallet: WalletKey;
//     amount: number; // positive = credit wallet (profit/sell), negative = debit wallet (loss/buy)
//     label: string;
//   }) => Promise<boolean>;
//   transactions: Transaction[];
//   addTransaction: (tx: Omit<Transaction, "id">) => Promise<void>;
//   notifications: Notification[];
//   markAllRead: () => void;
//   unreadCount: number;
//   kycStatus: "pending" | "submitted" | "approved";
//   setKycStatus: (s: "pending" | "submitted" | "approved") => void;
//   userProfile: UserProfile | null;
//   loading: boolean;
//   refetchWallets: () => Promise<void>;
//   refetchTransactions: () => Promise<void>;
// }

// const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

// export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
//   const [mode, setModeState] = useState<Mode>("trading");
//   const [wallets, setWallets] = useState<WalletState>({ main: 0, trading: 0, investing: 0 });
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [kycStatus, setKycStatusState] = useState<"pending" | "submitted" | "approved">("pending");
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Refs so async functions always read the freshest value, never a stale
//   // closure from the render that created them. This is the fix for wallets
//   // silently not updating / writing wrong values to Supabase.
//   const walletsRef = useRef<WalletState>({ main: 0, trading: 0, investing: 0 });
//   const userIdRef = useRef<string | null>(null);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const setMode = (newMode: Mode) => {
//     setModeState(newMode);
//     if (typeof window !== "undefined") localStorage.setItem("farlo_mode", newMode);
//   };

//   const setKycStatus = (s: "pending" | "submitted" | "approved") => {
//     setKycStatusState(s);
//     if (typeof window !== "undefined" && userIdRef.current) {
//       localStorage.setItem(`farlo_kyc_${userIdRef.current}`, s);
//     }
//   };

//   const refetchWallets = useCallback(async () => {
//     const uid = userIdRef.current;
//     if (!uid) return;
//     const { data } = await supabase
//       .from("wallets")
//       .select("main_balance, trading_balance, investing_balance")
//       .eq("user_id", uid)
//       .single();
//     if (data) {
//       const w = {
//         main: data.main_balance ?? 0,
//         trading: data.trading_balance ?? 0,
//         investing: data.investing_balance ?? 0,
//       };
//       walletsRef.current = w;
//       setWallets(w);
//     }
//   }, []);

//   const refetchTransactions = useCallback(async () => {
//     const uid = userIdRef.current;
//     if (!uid) return;
//     const { data } = await supabase
//       .from("transactions")
//       .select("*")
//       .eq("user_id", uid)
//       .order("date", { ascending: false });
//     setTransactions(data ?? []);
//   }, []);

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) { setLoading(false); return; }

//       const user = session.user;
//       userIdRef.current = user.id;

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       const { count } = await supabase
//         .from("transactions")
//         .select("id", { count: "exact", head: true })
//         .eq("user_id", user.id);

//       const isNewUser = !count || count === 0;

//       setUserProfile({
//         id: user.id,
//         email: user.email ?? "",
//         firstName: profile?.first_name ?? undefined,
//         lastName: profile?.last_name ?? undefined,
//         isNewUser,
//       });

//       const savedMode = profile?.default_mode ?? (typeof window !== "undefined" ? localStorage.getItem("farlo_mode") : null);
//       if (savedMode === "trading" || savedMode === "investing") setModeState(savedMode);

//       const savedKyc = typeof window !== "undefined" ? localStorage.getItem(`farlo_kyc_${user.id}`) : null;
//       if (savedKyc === "pending" || savedKyc === "submitted" || savedKyc === "approved") {
//         setKycStatusState(savedKyc);
//       } else {
//         const { data: kycRow } = await supabase
//           .from("kyc")
//           .select("status")
//           .eq("user_id", user.id)
//           .single();
//         if (kycRow?.status === "approved" || kycRow?.status === "submitted") {
//           setKycStatusState(kycRow.status);
//         }
//       }

//       const { data: walletData } = await supabase
//         .from("wallets")
//         .select("main_balance, trading_balance, investing_balance")
//         .eq("user_id", user.id)
//         .single();

//       if (walletData) {
//         const w = {
//           main: walletData.main_balance ?? 0,
//           trading: walletData.trading_balance ?? 0,
//           investing: walletData.investing_balance ?? 0,
//         };
//         walletsRef.current = w;
//         setWallets(w);
//       }

//       const { data: txData } = await supabase
//         .from("transactions")
//         .select("*")
//         .eq("user_id", user.id)
//         .order("date", { ascending: false });

//       setTransactions(txData ?? []);

//       if (isNewUser) {
//         setNotifications([
//           { id: "n_welcome", title: "Welcome to Farlo", message: "Your account has been created. Start by completing your KYC verification.", time: "Just now", read: false, type: "info" },
//           { id: "n_kyc", title: "KYC Verification Required", message: "Complete your identity verification to unlock full access.", time: "Just now", read: false, type: "warning" },
//         ]);
//       } else {
//         setNotifications([
//           { id: "n_welcome_back", title: "Welcome back", message: "You have successfully logged in.", time: "Just now", read: false, type: "success" },
//         ]);
//       }

//       setLoading(false);
//     };

//     init();
//   }, []);

//   const addTransaction = useCallback(async (tx: Omit<Transaction, "id">) => {
//     const uid = userIdRef.current;
//     if (!uid) return;
//     const { data, error } = await supabase
//       .from("transactions")
//       .insert({ ...tx, user_id: uid })
//       .select()
//       .single();
//     if (error) {
//       console.error("Failed to record transaction:", error.message);
//       return;
//     }
//     if (data) {
//       setTransactions((prev) => [data, ...prev]);
//     }
//   }, []);

//   const persistWallets = useCallback(async (newWallets: WalletState) => {
//     const uid = userIdRef.current;
//     if (!uid) return;
//     const { error } = await supabase
//       .from("wallets")
//       .update({
//         main_balance: newWallets.main,
//         trading_balance: newWallets.trading,
//         investing_balance: newWallets.investing,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("user_id", uid);
//     if (error) console.error("Failed to persist wallets:", error.message);
//   }, []);

//   const deposit = useCallback(async (amount: number, label = "Deposit to Main Wallet") => {
//     const current = walletsRef.current;
//     const newWallets = { ...current, main: current.main + amount };
//     walletsRef.current = newWallets;
//     setWallets(newWallets);
//     await persistWallets(newWallets);
//     await addTransaction({
//       type: "deposit",
//       wallet: "main",
//       label,
//       amount,
//       date: new Date().toISOString(),
//       status: "completed",
//     });
//     setNotifications((prev) => [
//       { id: `n${Date.now()}`, title: "Deposit Confirmed", message: `$${amount.toFixed(2)} added to your Main Wallet.`, time: "Just now", read: false, type: "success" },
//       ...prev,
//     ]);
//   }, [persistWallets, addTransaction]);

//   const withdraw = useCallback(async (amount: number, fromWallet: WalletKey = "main", label = "Withdrawal"): Promise<boolean> => {
//     const current = walletsRef.current;
//     if (current[fromWallet] < amount) return false;
//     const newWallets = { ...current, [fromWallet]: current[fromWallet] - amount };
//     walletsRef.current = newWallets;
//     setWallets(newWallets);
//     await persistWallets(newWallets);
//     await addTransaction({
//       type: "withdrawal",
//       wallet: fromWallet,
//       label,
//       amount: -amount,
//       date: new Date().toISOString(),
//       status: "pending",
//     });
//     setNotifications((prev) => [
//       { id: `n${Date.now()}`, title: "Withdrawal Submitted", message: `$${amount.toFixed(2)} withdrawal is being processed.`, time: "Just now", read: false, type: "info" },
//       ...prev,
//     ]);
//     return true;
//   }, [persistWallets, addTransaction]);

//   const transfer = useCallback(async (from: WalletKey, to: WalletKey, amount: number): Promise<boolean> => {
//     const current = walletsRef.current;
//     if (current[from] < amount) return false;
//     const newWallets = { ...current, [from]: current[from] - amount, [to]: current[to] + amount };
//     walletsRef.current = newWallets;
//     setWallets(newWallets);
//     await persistWallets(newWallets);

//     const fromLabel = from.charAt(0).toUpperCase() + from.slice(1);
//     const toLabel = to.charAt(0).toUpperCase() + to.slice(1);

//     await addTransaction({ type: "transfer_out", wallet: from, label: `Transfer to ${toLabel} Wallet`, amount: -amount, date: new Date().toISOString(), status: "completed" });
//     await addTransaction({ type: "transfer_in", wallet: to, label: `Received from ${fromLabel} Wallet`, amount, date: new Date().toISOString(), status: "completed" });

//     setNotifications((prev) => [
//       { id: `n${Date.now()}`, title: "Transfer Successful", message: `$${amount.toFixed(2)} moved from ${fromLabel} to ${toLabel} Wallet.`, time: "Just now", read: false, type: "success" },
//       ...prev,
//     ]);
//     return true;
//   }, [persistWallets, addTransaction]);


//   const trade = useCallback(async ({ wallet, amount, label }: { wallet: WalletKey; amount: number; label: string }): Promise<boolean> => {
//     const current = walletsRef.current;
//     if (amount < 0 && current[wallet] < Math.abs(amount)) return false;

//     const newWallets = { ...current, [wallet]: current[wallet] + amount };
//     walletsRef.current = newWallets;
//     setWallets(newWallets);
//     await persistWallets(newWallets);

//     await addTransaction({
//       type: "trade",
//       wallet,
//       label,
//       amount,
//       date: new Date().toISOString(),
//       status: "completed",
//     });

//     return true;
//   }, [persistWallets, addTransaction]);

//   const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

//   return (
//     <DashboardContext.Provider value={{
//       mode, setMode,
//       wallets, setWallets,
//       transfer, deposit, withdraw, trade,
//       transactions, addTransaction,
//       notifications, markAllRead, unreadCount,
//       kycStatus, setKycStatus,
//       userProfile, loading,
//       refetchWallets, refetchTransactions,
//     }}>
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboard = () => useContext(DashboardContext);

"use client";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

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

type WalletKey = "main" | "trading" | "investing";

interface DashboardContextType {
  mode: Mode;
  setMode: (m: Mode) => void;
  wallets: WalletState;
  setWallets: React.Dispatch<React.SetStateAction<WalletState>>;
  transfer: (from: WalletKey, to: WalletKey, amount: number) => Promise<boolean>;
  deposit: (amount: number, label?: string, targetWallet?: WalletKey) => Promise<void>;
  withdraw: (amount: number, fromWallet: WalletKey, label?: string) => Promise<boolean>;
  trade: (params: { wallet: WalletKey; amount: number; label: string }) => Promise<boolean>;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => Promise<void>;
  notifications: Notification[];
  pushNotification: (n: { title: string; message: string; type: "info" | "success" | "warning" }) => Promise<void>;
  markAllRead: () => void;
  unreadCount: number;
  kycStatus: "pending" | "submitted" | "approved";
  submitKyc: (data?: Record<string, unknown>) => Promise<void>;
  userProfile: UserProfile | null;
  loading: boolean;
  refetchWallets: () => Promise<void>;
  refetchTransactions: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

const relativeTime = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<Mode>("trading");
  const [wallets, setWallets] = useState<WalletState>({ main: 0, trading: 0, investing: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [kycStatus, setKycStatusState] = useState<"pending" | "submitted" | "approved">("pending");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const walletsRef = useRef<WalletState>({ main: 0, trading: 0, investing: 0 });
  const userIdRef = useRef<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") localStorage.setItem("farlo_mode", newMode);
  };

  const refetchWallets = useCallback(async () => {
    const uid = userIdRef.current;
    if (!uid) return;
    const { data } = await supabase
      .from("wallets")
      .select("main_balance, trading_balance, investing_balance")
      .eq("user_id", uid)
      .single();
    if (data) {
      const w = {
        main: data.main_balance ?? 0,
        trading: data.trading_balance ?? 0,
        investing: data.investing_balance ?? 0,
      };
      walletsRef.current = w;
      setWallets(w);
    }
  }, []);

  const refetchTransactions = useCallback(async () => {
    const uid = userIdRef.current;
    if (!uid) return;
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", uid)
      .order("date", { ascending: false });
    setTransactions(data ?? []);
  }, []);

  const pushNotification = useCallback(async (n: { title: string; message: string; type: "info" | "success" | "warning" }) => {
    const uid = userIdRef.current;
    const localId = `n${Date.now()}`;

    setNotifications((prev) => [
      { id: localId, title: n.title, message: n.message, time: "Just now", read: false, type: n.type },
      ...prev,
    ]);

    if (!uid) return;

    const { data, error } = await supabase
      .from("notifications")
      .insert({ user_id: uid, title: n.title, message: n.message, type: n.type, read: false })
      .select()
      .single();

    if (!error && data) {
      setNotifications((prev) =>
        prev.map((item) => (item.id === localId ? { ...item, id: data.id } : item))
      );
    }
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const uid = userIdRef.current;
    if (!uid) return;
    supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", uid)
      .eq("read", false)
      .then();
  }, []);

  const submitKyc = useCallback(async (data?: Record<string, unknown>) => {
    const uid = userIdRef.current;
    setKycStatusState("submitted");
    if (!uid) return;

    await supabase
      .from("kyc")
      .update({
        status: "submitted",
        submitted_at: new Date().toISOString(),
        ...data,
      })
      .eq("user_id", uid);

    await pushNotification({
      title: "KYC Submitted",
      message: "Your identity verification is under review. This usually takes 24–48 hours.",
      type: "info",
    });
  }, [pushNotification]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const user = session.user;
      userIdRef.current = user.id;

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

      const savedMode = profile?.default_mode ?? (typeof window !== "undefined" ? localStorage.getItem("farlo_mode") : null);
      if (savedMode === "trading" || savedMode === "investing") setModeState(savedMode);

      const { data: kycRow } = await supabase
        .from("kyc")
        .select("status")
        .eq("user_id", user.id)
        .single();

      if (kycRow?.status === "approved" || kycRow?.status === "submitted" || kycRow?.status === "pending") {
        setKycStatusState(kycRow.status as "pending" | "submitted" | "approved");
      }

      const { data: walletData } = await supabase
        .from("wallets")
        .select("main_balance, trading_balance, investing_balance")
        .eq("user_id", user.id)
        .single();

      if (walletData) {
        const w = {
          main: walletData.main_balance ?? 0,
          trading: walletData.trading_balance ?? 0,
          investing: walletData.investing_balance ?? 0,
        };
        walletsRef.current = w;
        setWallets(w);
      }

      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      setTransactions(txData ?? []);

      const { data: notifData } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30);

      if (notifData && notifData.length > 0) {
        setNotifications(
          notifData.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            time: relativeTime(n.created_at),
            read: n.read,
            type: n.type,
          }))
        );
      } else if (isNewUser) {
        const welcomeMsgs = [
          { title: "Welcome to Farlo", message: "Your account has been created. Start by completing your KYC verification.", type: "info" as const },
          { title: "KYC Verification Required", message: "Complete your identity verification to unlock full access.", type: "warning" as const },
        ];
        for (const m of welcomeMsgs) {
          await supabase.from("notifications").insert({ user_id: user.id, ...m, read: false });
        }
        setNotifications(
          welcomeMsgs.map((m, i) => ({ id: `seed_${i}`, ...m, time: "Just now", read: false }))
        );
      }

      setLoading(false);
    };

    init();
  }, []);

  const addTransaction = useCallback(async (tx: Omit<Transaction, "id">) => {
    const uid = userIdRef.current;
    if (!uid) return;
    const { data, error } = await supabase
      .from("transactions")
      .insert({ ...tx, user_id: uid })
      .select()
      .single();
    if (error) {
      console.error("Failed to record transaction:", error.message);
      return;
    }
    if (data) {
      setTransactions((prev) => [data, ...prev]);
    }
  }, []);

  const persistWallets = useCallback(async (newWallets: WalletState) => {
    const uid = userIdRef.current;
    if (!uid) return;
    const { error } = await supabase
      .from("wallets")
      .update({
        main_balance: newWallets.main,
        trading_balance: newWallets.trading,
        investing_balance: newWallets.investing,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", uid);
    if (error) console.error("Failed to persist wallets:", error.message);
  }, []);

  const deposit = useCallback(async (amount: number, label = "Deposit", targetWallet: WalletKey = "main") => {
    const current = walletsRef.current;
    const newWallets = { ...current, [targetWallet]: current[targetWallet] + amount };
    walletsRef.current = newWallets;
    setWallets(newWallets);
    await persistWallets(newWallets);
    await addTransaction({
      type: "deposit",
      wallet: targetWallet,
      label,
      amount,
      date: new Date().toISOString(),
      status: "completed",
    });
    const walletLabel = targetWallet.charAt(0).toUpperCase() + targetWallet.slice(1);
    await pushNotification({
      title: "Deposit Confirmed",
      message: `$${amount.toFixed(2)} added to your ${walletLabel} Wallet.`,
      type: "success",
    });
  }, [persistWallets, addTransaction, pushNotification]);

  const withdraw = useCallback(async (amount: number, fromWallet: WalletKey = "main", label = "Withdrawal"): Promise<boolean> => {
    const current = walletsRef.current;
    if (current[fromWallet] < amount) return false;
    const newWallets = { ...current, [fromWallet]: current[fromWallet] - amount };
    walletsRef.current = newWallets;
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
    await pushNotification({
      title: "Withdrawal Submitted",
      message: `$${amount.toFixed(2)} withdrawal is being processed.`,
      type: "info",
    });
    return true;
  }, [persistWallets, addTransaction, pushNotification]);

  const transfer = useCallback(async (from: WalletKey, to: WalletKey, amount: number): Promise<boolean> => {
    const current = walletsRef.current;
    if (current[from] < amount) return false;
    const newWallets = { ...current, [from]: current[from] - amount, [to]: current[to] + amount };
    walletsRef.current = newWallets;
    setWallets(newWallets);
    await persistWallets(newWallets);

    const fromLabel = from.charAt(0).toUpperCase() + from.slice(1);
    const toLabel = to.charAt(0).toUpperCase() + to.slice(1);

    await addTransaction({ type: "transfer_out", wallet: from, label: `Transfer to ${toLabel} Wallet`, amount: -amount, date: new Date().toISOString(), status: "completed" });
    await addTransaction({ type: "transfer_in", wallet: to, label: `Received from ${fromLabel} Wallet`, amount, date: new Date().toISOString(), status: "completed" });

    await pushNotification({
      title: "Transfer Successful",
      message: `$${amount.toFixed(2)} moved from ${fromLabel} to ${toLabel} Wallet.`,
      type: "success",
    });
    return true;
  }, [persistWallets, addTransaction, pushNotification]);

  const trade = useCallback(async ({ wallet, amount, label }: { wallet: WalletKey; amount: number; label: string }): Promise<boolean> => {
    const current = walletsRef.current;
    if (amount < 0 && current[wallet] < Math.abs(amount)) return false;

    const newWallets = { ...current, [wallet]: current[wallet] + amount };
    walletsRef.current = newWallets;
    setWallets(newWallets);
    await persistWallets(newWallets);

    await addTransaction({
      type: "trade",
      wallet,
      label,
      amount,
      date: new Date().toISOString(),
      status: "completed",
    });

    return true;
  }, [persistWallets, addTransaction]);

  return (
    <DashboardContext.Provider value={{
      mode, setMode,
      wallets, setWallets,
      transfer, deposit, withdraw, trade,
      transactions, addTransaction,
      notifications, pushNotification, markAllRead, unreadCount,
      kycStatus, submitKyc,
      userProfile, loading,
      refetchWallets, refetchTransactions,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);