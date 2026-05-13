import { LogoBlack } from "@/assets/vectors";
import styles from "./styles.module.scss";
import { LoginForm } from "../_components/login-form";
import { RegisterForm } from "../_components/register-form";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";

const AuthUI = () => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === ROUTES.signup) return setTab("register");
    setTab("login");
  }, [pathname]);

  return (
    <div className={styles.container}>
      <section className={styles.body}>
        <Link href={ROUTES.home}>
          <LogoBlack />
        </Link>
        <div className={styles.tabs}>
          <button
            className={tab === "login" ? styles.active : ""}
            onClick={() => router.push(ROUTES.login)}
          >
            Login
          </button>
          <button
            className={tab === "register" ? styles.active : ""}
            onClick={() => router.push(ROUTES.signup)}
          >
            Register
          </button>
        </div>
        {tab === "login" ? <LoginForm /> : <RegisterForm />}
      </section>
    </div>
  );
};

export { AuthUI };
