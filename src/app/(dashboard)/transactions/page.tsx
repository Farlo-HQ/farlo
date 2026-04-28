"use client";

import { TransactionsUI } from "@/modules/transactions";
import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function TransactionsPage() {
  return (
    <>
      <TransactionsUI />
    </>
  );
}