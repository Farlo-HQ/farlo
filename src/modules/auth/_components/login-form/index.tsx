// import { useState } from "react";
// import styles from "./styles.module.scss";
// import { Input } from "@/components/input";
// import { Button } from "@/components";
// import { useRouter } from "next/navigation";
// import { ROUTES } from "@/utils/routes";

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// interface LoginFormErrors {
//   email?: string;
//   password?: string;
// }

// const LoginForm = () => {
//   const [state, setState] = useState<LoginFormData>({
//     password: "",
//     email: "",
//   });
//   const { password, email } = state;
//   const [error, setError] = useState<LoginFormErrors | undefined>();
//   const router = useRouter();

//   const handleSubmit = (e?: React.MouseEvent) => {
//     e?.preventDefault();
//     const errors: LoginFormErrors = {};
//     if (password.trim().length === 0) errors.password = "Required";
//     if (email.trim().length === 0) errors.email = "Required";

//     if (Object.keys(errors).length > 0) {
//       setError(errors);
//     } else {
//       router.push(ROUTES.overview);
//     }
//   };

//   return (
//     <div className={styles.form}>
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
//         type="password"
//         placeholder="********"
//         value={password}
//         onChange={(e) =>
//           setState((prev) => ({ ...prev, password: e.target.value }))
//         }
//         error={error?.password}
//         styleType="style2"
//       />
//       <Button onClick={handleSubmit}>Login</Button>
//     </div>
//   );
// };

// export { LoginForm };

"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/input";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [state, setState] = useState<LoginFormData>({
    password: "",
    email: "",
  });
  const { password, email } = state;
  const [error, setError] = useState<LoginFormErrors | undefined>();
  const router = useRouter();

  const handleSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const errors: LoginFormErrors = {};
    if (password.trim().length === 0) errors.password = "Required";
    if (email.trim().length === 0) errors.email = "Required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      router.push(ROUTES.overview);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="john@website.com"
        value={email}
        onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email}
        styleType="style2"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))}
        error={error?.password}
        styleType="style2"
      />
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
};

export { LoginForm };
