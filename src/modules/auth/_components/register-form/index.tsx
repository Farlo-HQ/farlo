"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/input";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { supabase } from "@/lib/supabase";
import { useDashboard } from "@/context/DashboardContext";
import { IoArrowForward } from "react-icons/io5";

interface RegisterFormData {
  country: string;
  password: string;
  email: string;
  phone: string;
}

interface RegisterFormErrors {
  password?: string;
  country?: string;
  email?: string;
  phone?: string;
}

type Mode = "trading" | "investing" | null;
type Step = "details" | "mode";

interface Props {
  onModeStepChange?: (isOnModeStep: boolean) => void;
}

const options = [
  { value: "australia", label: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { value: "brazil", label: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { value: "canada", label: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { value: "china", label: "China", flag: "🇨🇳", dialCode: "+86" },
  { value: "egypt", label: "Egypt", flag: "🇪🇬", dialCode: "+20" },
  { value: "france", label: "France", flag: "🇫🇷", dialCode: "+33" },
  { value: "germany", label: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { value: "ghana", label: "Ghana", flag: "🇬🇭", dialCode: "+233" },
  { value: "india", label: "India", flag: "🇮🇳", dialCode: "+91" },
  { value: "ireland", label: "Ireland", flag: "🇮🇪", dialCode: "+353" },
  { value: "italy", label: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { value: "japan", label: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { value: "kenya", label: "Kenya", flag: "🇰🇪", dialCode: "+254" },
  { value: "mexico", label: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { value: "netherlands", label: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { value: "nigeria", label: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { value: "norway", label: "Norway", flag: "🇳🇴", dialCode: "+47" },
  { value: "portugal", label: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { value: "saudi-arabia", label: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { value: "singapore", label: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { value: "south-africa", label: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { value: "south-korea", label: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { value: "spain", label: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { value: "sweden", label: "Sweden", flag: "🇸🇪", dialCode: "+46" },
  { value: "switzerland", label: "Switzerland", flag: "🇨🇭", dialCode: "+41" },
  { value: "turkey", label: "Turkey", flag: "🇹🇷", dialCode: "+90" },
  { value: "uae", label: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { value: "usa", label: "United States", flag: "🇺🇸", dialCode: "+1" },
];

function CountrySelect({
  value,
  onChange,
  options,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string; flag?: string; dialCode?: string }[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.cselect_wrap} ref={ref}>
      <label className={styles.cselect_label}>Country / Region of residence</label>
      <button
        type="button"
        className={`${styles.cselect_trigger} ${error ? styles.cselect_error : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.cselect_val}>
          {selected ? (
            <>
              <img
                src={`https://flagcdn.com/24x18/${selected.value === "uk" ? "gb" : selected.value === "uae" ? "ae" : selected.value === "usa" ? "us" : selected.value === "south-africa" ? "za" : selected.value === "south-korea" ? "kr" : selected.value === "saudi-arabia" ? "sa" : selected.value}.png`}
                alt={selected.label}
                width={20}
                height={15}
                style={{ borderRadius: 2 }}
              />
              <span>{selected.label}</span>
            </>
          ) : (
            <span className={styles.cselect_placeholder}>Select your country</span>
          )}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {error && <p className={styles.cselect_err_msg}>{error}</p>}

      {open && (
        <div className={styles.cselect_menu}>
          <div className={styles.cselect_search_wrap}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              className={styles.cselect_search}
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.cselect_list}>
            {filtered.length === 0 ? (
              <p className={styles.cselect_empty}>No results</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.cselect_option} ${value === opt.value ? styles.cselect_option_active : ""}`}
                  onClick={() => { onChange(opt.value); setOpen(false); setSearch(""); }}
                >
                  <img
                    src={`https://flagcdn.com/24x18/${opt.value === "uk" ? "gb" : opt.value === "uae" ? "ae" : opt.value === "usa" ? "us" : opt.value === "south-africa" ? "za" : opt.value === "south-korea" ? "kr" : opt.value === "saudi-arabia" ? "sa" : opt.value}.png`}
                    alt={opt.label}
                    width={20}
                    height={15}
                    style={{ borderRadius: 2, flexShrink: 0 }}
                  />
                  <span className={styles.cselect_name}>{opt.label}</span>
                  {opt.dialCode && <span className={styles.cselect_dial}>{opt.dialCode}</span>}
                  {value === opt.value && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto", flexShrink: 0, color: "var(--primary)" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const RegisterForm = ({ onModeStepChange }: Props) => {
  const [step, setStep] = useState<Step>("details");
  const [state, setState] = useState<RegisterFormData>({ password: "", country: "", email: "", phone: "" });
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [modeError, setModeError] = useState(false);
  const [error, setError] = useState<RegisterFormErrors | undefined>();
  const router = useRouter();
  const { email, password, country, phone } = state;
  const { setMode } = useDashboard();

  useEffect(() => {
    onModeStepChange?.(step === "mode");
  }, [step, onModeStepChange]);

  const handleDetailsSubmit = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    const errors: RegisterFormErrors = {};
    if (!password.trim()) errors.password = "Required";
    if (!email.trim()) errors.email = "Required";
    if (!country || !String(country).trim()) errors.country = "Required";
    if (!phone.trim()) errors.phone = "Required";
    else if (!/^\+?[1-9]\d{1,14}$/.test(phone)) errors.phone = "Invalid phone number";

    if (Object.keys(errors).length > 0) { setError(errors); return; }
    setError(undefined);

    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (existingUser) {
      setError({ email: "An account with this email already exists." });
      return;
    }

    setStep("mode");
  };

  const handleFinalSubmit = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!selectedMode) { setModeError(true); return; }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone,
          country,
          default_mode: selectedMode,
          first_name: "",
          last_name: "",
        },
      },
    });

    if (signUpError) {
      const msg = signUpError.message.toLowerCase();
      if (msg.includes("already") || msg.includes("exists") || msg.includes("registered")) {
        setStep("details");
        setError({ email: "An account with this email already exists. Please log in instead." });
      } else {
        setStep("details");
        setError({ email: signUpError.message });
      }
      return;
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setStep("details");
      setError({ email: "An account with this email already exists. Please log in instead." });
      return;
    }

    if (data.user) {
      await supabase
        .from("profiles")
        .update({ phone, country, default_mode: selectedMode })
        .eq("id", data.user.id);

      setMode(selectedMode);
      router.push(ROUTES.overview);
    }
  };

  if (step === "mode") {
    return (
      <div className={styles.mode_wrap}>
        <div className={styles.progress}>
          <div className={`${styles.dot} ${styles.dot_done}`} />
          <div className={`${styles.dot} ${styles.dot_active}`} />
        </div>

        <div className={styles.mode_heading}>
          <h2 className={styles.mode_title}>How do you want to start?</h2>
          <p className={styles.mode_sub}>
            Pick your default mode. You can switch anytime — your wallet works across both.
          </p>
        </div>

        <div className={styles.mode_cards}>
          <button
            type="button"
            className={`${styles.mode_card} ${selectedMode === "trading" ? styles.mode_card_sel_t : ""}`}
            onClick={() => { setSelectedMode("trading"); setModeError(false); }}
          >
            <div className={styles.mode_icon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <p className={styles.mode_card_name}>Trading</p>
            <p className={styles.mode_card_desc}>FX, CFDs, crypto &amp; copy trading</p>
            {selectedMode === "trading" && <div className={styles.sel_ring} />}
          </button>

          <button
            type="button"
            className={`${styles.mode_card} ${selectedMode === "investing" ? styles.mode_card_sel_i : ""}`}
            onClick={() => { setSelectedMode("investing"); setModeError(false); }}
          >
            <div className={styles.mode_icon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
              </svg>
            </div>
            <p className={styles.mode_card_name}>Investing</p>
            <p className={styles.mode_card_desc}>US stocks, ETFs &amp; options</p>
            {selectedMode === "investing" && <div className={styles.sel_ring} />}
          </button>
        </div>

        {modeError && <p className={styles.mode_error}>Please select a mode to continue.</p>}

        <button className={styles.continue_btn} onClick={handleFinalSubmit}>
          Continue →
        </button>

        <button className={styles.back_link} onClick={() => setStep("details")}>
          ← Back to account details
        </button>
      </div>
    );
  }

  return (
    <div className={styles.form_wrap}>
      <CountrySelect
        value={country}
        onChange={(val) => {
          const found = options.find((o) => o.value === val);
          setState((prev) => ({ ...prev, country: val, phone: found?.dialCode ?? prev.phone }));
        }}
        options={options}
        error={error?.country}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email}
        styleType="style2"
      />
      <Input
        name="password"
        label="Password"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))}
        error={error?.password}
        styleType="style2"
      />
      <Input
        name="phone"
        label="Phone Number"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
        error={error?.phone}
        styleType="style2"
      />
      <Button onClick={handleDetailsSubmit}>Continue <IoArrowForward /></Button>
    </div>
  );
};

export { RegisterForm };