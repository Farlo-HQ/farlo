"use client";

import { DashboardLayout } from "@/modules/dashboard-layout";
import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </DashboardProvider>
    </ThemeProvider>
  );
}
