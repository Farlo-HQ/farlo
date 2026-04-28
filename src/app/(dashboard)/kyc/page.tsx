"use client";

import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { KycUI } from "@/modules/kyc";

export default function KycPage() {
  return (
    <>
      <KycUI />
    </>
  );
}