import { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/input";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

interface LoginFormData {
  email: string;
  username: string;
}

interface LoginFormErrors {
  email?: string;
  username?: string;
}

const LoginForm = () => {
  const [state, setState] = useState<LoginFormData>({
    username: "",
    email: "",
  });
  const { username, email } = state;
  const [error, setError] = useState<LoginFormErrors | undefined>();
  const router = useRouter();

  const handleSubmit = () => {
    const errors: LoginFormErrors = {};

    if (username.trim().length === 0) errors.username = "Required";
    if (email.trim().length === 0) errors.email = "Required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      console.log(state);
      router.push(ROUTES.overview);
    }
  };

  return (
    <form className={styles.form}>
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="John @website.com"
        value={email}
        onChange={(e) =>
          setState((prev) => ({ ...prev, email: e.target.value }))
        }
        error={error?.email}
        styleType="style2"
      />
      <Input
        name="username"
        label="Username"
        placeholder="John Doe"
        value={username}
        onChange={(e) =>
          setState((prev) => ({ ...prev, username: e.target.value }))
        }
        error={error?.username}
        styleType="style2"
      />
      <Button onClick={handleSubmit}>Login</Button>
    </form>
  );
};

export { LoginForm };
