// import { LogoBlack } from "@/assets/vectors";
// import styles from "./styles.module.scss";
// import { LoginForm } from "../_components/login-form";
// import { RegisterForm } from "../_components/register-form";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { ROUTES } from "@/utils/routes";
// import Link from "next/link";

// const AuthUI = () => {
//   const [tab, setTab] = useState<"login" | "register">("login");
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     if (pathname === ROUTES.signup) return setTab("register");
//     setTab("login");
//   }, [pathname]);

//   return (
//     <div className={styles.container}>
//       <section className={styles.body}>
//         <Link href={ROUTES.home}>
//           <LogoBlack />
//         </Link>
//         <div className={styles.tabs}>
//           <button
//             className={tab === "login" ? styles.active : ""}
//             onClick={() => router.push(ROUTES.login)}
//           >
//             Login
//           </button>
//           <button
//             className={tab === "register" ? styles.active : ""}
//             onClick={() => router.push(ROUTES.signup)}
//           >
//             Register
//           </button>
//         </div>
//         {tab === "login" ? <LoginForm /> : <RegisterForm />}
//       </section>
//     </div>
//   );
// };

// export { AuthUI };

"use client";
import { LogoBlack } from "@/assets/vectors";
import styles from "./styles.module.scss";
import { LoginForm } from "../_components/login-form";
import { RegisterForm } from "../_components/register-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";

interface AuthUIProps {
  defaultTab?: "login" | "register";
}

// In auth/auth/index.tsx — simplify to just this
const AuthUI = ({ defaultTab = "login" }: AuthUIProps) => {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [onModeStep, setOnModeStep] = useState(false);
  const router = useRouter();

  const handleTabSwitch = (newTab: "login" | "register") => {
    setTab(newTab);
    setOnModeStep(false);
    router.push(newTab === "login" ? ROUTES.login : ROUTES.signup);
  };

  return (
    <div className={styles.container}>
      <section className={styles.body}>
        <Link href={ROUTES.home} className={styles.logo_link}>
          <LogoBlack />
        </Link>

        {!onModeStep && (
          <div className={styles.tabs}>
            <button className={tab === "login" ? styles.active : ""} onClick={() => handleTabSwitch("login")}>Login</button>
            <button className={tab === "register" ? styles.active : ""} onClick={() => handleTabSwitch("register")}>Register</button>
          </div>
        )}

        {tab === "login" ? <LoginForm /> : <RegisterForm onModeStepChange={setOnModeStep} />}
      </section>
    </div>
  );
};

export { AuthUI };
