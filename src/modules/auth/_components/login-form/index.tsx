"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/input";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { supabase } from "@/lib/supabase";
import { useDashboard } from "@/context/DashboardContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [state, setState] = useState<LoginFormData>({ password: "", email: "" });
  const { password, email } = state;
  const [error, setError] = useState<LoginFormErrors | undefined>();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setMode } = useDashboard();

  const handleSubmit = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (loading) return;

    setGeneralError(undefined);

    const errors: LoginFormErrors = {};
    if (!email.trim()) errors.email = "Required";
    if (!password.trim()) errors.password = "Required";

    if (Object.keys(errors).length > 0) { setError(errors); return; }
    setError(undefined);

    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setLoading(false);
      if (authError.message.toLowerCase().includes("email")) {
        setError({ email: authError.message });
      } else if (authError.message.toLowerCase().includes("password")) {
        setError({ password: authError.message });
      } else {
        setGeneralError("Invalid email or password. Please try again.");
      }
      return;
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("default_mode")
        .eq("id", data.user.id)
        .single();

      if (profile?.default_mode) {
        setMode(profile.default_mode as "trading" | "investing");
      }


      router.push(ROUTES.overview);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      {generalError && (
        <div className={styles.general_error}>
          {generalError}
        </div>
      )}
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="email"
        value={email}
        onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email}
        styleType="style2"
        disabled={loading}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))}
        error={error?.password}
        styleType="style2"
        disabled={loading}
      />
      <Button onClick={handleSubmit} loading={loading} fullWidth>
        {loading ? "Logging in…" : "Login"}
      </Button>
    </div>
  );
};

export { LoginForm };