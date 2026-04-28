"use client";

import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DepositUI } from "@/modules/deposit";

export default function DepositPage() {
  return (
    <>
      <DepositUI />
    </>

  );
}