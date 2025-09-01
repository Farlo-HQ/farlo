import { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/input";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

interface RegisterFormData {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
}

interface RegisterFormErrors {
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
}

const RegisterForm = () => {
  const [state, setState] = useState<RegisterFormData>({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  const { username, email, firstname, lastname } = state;
  const [error, setError] = useState<RegisterFormErrors | undefined>();
  const router = useRouter();

  const handleSubmit = () => {
    const errors: RegisterFormErrors = {};

    if (username.trim().length === 0) errors.username = "Required";
    if (email.trim().length === 0) errors.email = "Required";
    if (firstname.trim().length === 0) errors.firstname = "Required";
    if (lastname.trim().length === 0) errors.lastname = "Required";

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
        name="firstname"
        label="First name"
        placeholder="John"
        value={firstname}
        onChange={(e) =>
          setState((prev) => ({ ...prev, firstname: e.target.value }))
        }
        error={error?.firstname}
        styleType="style2"
      />
      <Input
        name="lastname"
        label="Last name"
        placeholder="Doe"
        value={lastname}
        onChange={(e) =>
          setState((prev) => ({ ...prev, lastname: e.target.value }))
        }
        error={error?.lastname}
        styleType="style2"
      />
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
      <Button onClick={handleSubmit}>Register</Button>
    </form>
  );
};

export { RegisterForm };
