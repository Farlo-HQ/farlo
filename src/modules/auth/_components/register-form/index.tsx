// import { useState } from "react";
// import styles from "./styles.module.scss";
// import { Input } from "@/components/input";
// import { Button } from "@/components";
// import { useRouter } from "next/navigation";
// import { ROUTES } from "@/utils/routes";
// import { Select } from "@/components/select";

// interface RegisterFormData {
//   country: string;
//   password: string;
//   email: string;
//   phone: string;
// }

// interface RegisterFormErrors {
//   password?: string;
//   country?: string;
//   email?: string;
//   phone?: string;
// }

// const RegisterForm = () => {
//   const [state, setState] = useState<RegisterFormData>({
//     password: "",
//     country: "",
//     email: "",
//     phone: "+234",
//   });
//   const { email, password, country, phone } = state;
//   const [error, setError] = useState<RegisterFormErrors | undefined>();
//   const router = useRouter();

//   const handleSubmit = () => {
//     const errors: RegisterFormErrors = {};

//     if (password.trim().length === 0) errors.password = "Required";
//     // Add password strength validation
//     if (password && password.length < 8) {
//       errors.password = "Password must be at least 8 characters";
//     } else if (
//       password &&
//       !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)
//     ) {
//       errors.password =
//         "Password must include uppercase, lowercase, number, and special character";
//     }
//     if (email.trim().length === 0) errors.email = "Required";
//     if (country.trim().length === 0) errors.country = "Required";
//     if (phone.trim().length === 0) errors.phone = "Required";
//     // Add phone number format validation (simple example)
//     if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
//       errors.phone = "Invalid phone number format";
//     }

//     if (Object.keys(errors).length > 0) {
//       setError(errors);
//     } else {
//       console.log(state);
//       router.push(ROUTES.overview);
//     }
//   };

//   const options = [
//     { value: "argentina", label: "Argentina" },
//     { value: "australia", label: "Australia" },
//     { value: "austria", label: "Austria" },
//     { value: "belgium", label: "Belgium" },
//     { value: "brazil", label: "Brazil" },
//     { value: "bulgaria", label: "Bulgaria" },
//     { value: "canada", label: "Canada" },
//     { value: "chile", label: "Chile" },
//     { value: "china", label: "China" },
//     { value: "colombia", label: "Colombia" },
//     { value: "croatia", label: "Croatia" },
//     { value: "czech-republic", label: "Czech Republic" },
//     { value: "denmark", label: "Denmark" },
//     { value: "egypt", label: "Egypt" },
//     { value: "estonia", label: "Estonia" },
//     { value: "finland", label: "Finland" },
//     { value: "france", label: "France" },
//     { value: "germany", label: "Germany" },
//     { value: "greece", label: "Greece" },
//     { value: "hong-kong", label: "Hong Kong" },
//     { value: "hungary", label: "Hungary" },
//     { value: "india", label: "India" },
//     { value: "ireland", label: "Ireland" },
//     { value: "italy", label: "Italy" },
//     { value: "japan", label: "Japan" },
//     { value: "latvia", label: "Latvia" },
//     { value: "lithuania", label: "Lithuania" },
//     { value: "mexico", label: "Mexico" },
//     { value: "netherlands", label: "Netherlands" },
//     { value: "new-zealand", label: "New Zealand" },
//     { value: "niger", label: "Niger" },
//     { value: "nigeria", label: "Nigeria" },
//     { value: "norway", label: "Norway" },
//     { value: "peru", label: "Peru" },
//     { value: "poland", label: "Poland" },
//     { value: "portugal", label: "Portugal" },
//     { value: "romania", label: "Romania" },
//     { value: "russia", label: "Russia" },
//     { value: "saudi-arabia", label: "Saudi Arabia" },
//     { value: "singapore", label: "Singapore" },
//     { value: "slovakia", label: "Slovakia" },
//     { value: "slovenia", label: "Slovenia" },
//     { value: "south-africa", label: "South Africa" },
//     { value: "south-korea", label: "South Korea" },
//     { value: "spain", label: "Spain" },
//     { value: "sweden", label: "Sweden" },
//     { value: "switzerland", label: "Switzerland" },
//     { value: "turkey", label: "Turkey" },
//     { value: "uae", label: "United Arab Emirates" },
//     { value: "uk", label: "United Kingdom" },
//     { value: "usa", label: "United States" },
//     { value: "venezuela", label: "Venezuela" },
//   ];

//   return (
//     <form className={styles.form}>
//       <Select
//         label="Country / Region of residence"
//         options={options}
//         error={error?.country}
//         value={country}
//         onChange={(e) =>
//           setState((prev) => ({ ...prev, country: e.target.value }))
//         }
//       />
//       <Input
//         name="email"
//         type="email"
//         label="Email"
//         placeholder="John@website.com"
//         value={email}
//         onChange={(e) =>
//           setState((prev) => ({ ...prev, email: e.target.value }))
//         }
//         error={error?.email}
//         styleType="style2"
//       />
//       <Input
//         name="password"
//         label="Password"
//         placeholder="********"
//         type="password"
//         value={password}
//         onChange={(e) =>
//           setState((prev) => ({ ...prev, password: e.target.value }))
//         }
//         error={error?.password}
//         styleType="style2"
//       />
//       <Input
//         name="phone"
//         label="Phone Number"
//         placeholder="+2348199119191"
//         value={phone}
//         onChange={(e) =>
//           setState((prev) => ({ ...prev, phone: e.target.value }))
//         }
//         error={error?.phone}
//         styleType="style2"
//       />
//       <Button onClick={handleSubmit}>Register</Button>
//     </form>
//   );
// };

// export { RegisterForm };

"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/input";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { Select } from "@/components/select";

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
  { value: "australia", label: "Australia" },
  { value: "brazil", label: "Brazil" },
  { value: "canada", label: "Canada" },
  { value: "china", label: "China" },
  { value: "egypt", label: "Egypt" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "ghana", label: "Ghana" },
  { value: "india", label: "India" },
  { value: "ireland", label: "Ireland" },
  { value: "italy", label: "Italy" },
  { value: "japan", label: "Japan" },
  { value: "kenya", label: "Kenya" },
  { value: "mexico", label: "Mexico" },
  { value: "netherlands", label: "Netherlands" },
  { value: "nigeria", label: "Nigeria" },
  { value: "norway", label: "Norway" },
  { value: "portugal", label: "Portugal" },
  { value: "saudi-arabia", label: "Saudi Arabia" },
  { value: "singapore", label: "Singapore" },
  { value: "south-africa", label: "South Africa" },
  { value: "south-korea", label: "South Korea" },
  { value: "spain", label: "Spain" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "turkey", label: "Turkey" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
];

const RegisterForm = ({ onModeStepChange }: Props) => {
  const [step, setStep] = useState<Step>("details");
  const [state, setState] = useState<RegisterFormData>({
    password: "", country: "", email: "", phone: "+234",
  });
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [modeError, setModeError] = useState(false);
  const [error, setError] = useState<RegisterFormErrors | undefined>();
  const router = useRouter();
  const { email, password, country, phone } = state;

  useEffect(() => {
    onModeStepChange?.(step === "mode");
  }, [step, onModeStepChange]);

  const handleDetailsSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const errors: RegisterFormErrors = {};
    if (!password.trim()) errors.password = "Required";
    // else if (password.length < 8) errors.password = "At least 8 characters";
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password))
    //   errors.password = "Must include uppercase, lowercase, number & special character";
    if (!email.trim()) errors.email = "Required";
    if (!country.trim()) errors.country = "Required";
    if (!phone.trim()) errors.phone = "Required";
    else if (!/^\+?[1-9]\d{1,14}$/.test(phone)) errors.phone = "Invalid phone number";

    if (Object.keys(errors).length > 0) { setError(errors); return; }
    setError(undefined);
    setStep("mode");
  };

  const handleFinalSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!selectedMode) { setModeError(true); return; }
    router.push(ROUTES.overview);
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
      <Select
        label="Country / Region of residence"
        options={options}
        error={error?.country}
        value={country}
        onChange={(e) => setState((prev) => ({ ...prev, country: e.target.value }))}
      />
      <Input name="email" type="email" label="Email" placeholder="john@example.com"
        value={email} onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email} styleType="style2" />
      <Input name="password" label="Password" placeholder="••••••••" type="password"
        value={password} onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))}
        error={error?.password} styleType="style2" />
      <Input name="phone" label="Phone Number" placeholder="+2348199119191"
        value={phone} onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
        error={error?.phone} styleType="style2" />
      <Button onClick={handleDetailsSubmit}>Continue →</Button>
    </div>
  );
};

export { RegisterForm };