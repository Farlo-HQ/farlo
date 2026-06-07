
"use client";
import styles from "./styles.module.scss";
import { LoginForm } from "../_components/login-form";
import { RegisterForm } from "../_components/register-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { LogoRed } from "@/assets/vectors/logo-red";

interface AuthUIProps {
  defaultTab?: "login" | "register";
}

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
          <LogoRed />
        </Link>

        {!onModeStep && (
          <div className={styles.tabs}>
            <button
              className={tab === "login" ? styles.active : ""}
              onClick={() => handleTabSwitch("login")}
            >
              Login
            </button>
            <button
              className={tab === "register" ? styles.active : ""}
              onClick={() => handleTabSwitch("register")}
            >
              Register
            </button>
          </div>
        )}

        {tab === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm onModeStepChange={setOnModeStep} />
        )}
      </section>
    </div>
  );
};

export { AuthUI };