import { useState } from "react";
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
}

interface RegisterFormErrors {
  password?: string;
  country?: string;
  email?: string;
}

const RegisterForm = () => {
  const [state, setState] = useState<RegisterFormData>({
    password: "",
    country: "",
    email: "",
  });
  const { email, password, country } = state;
  const [error, setError] = useState<RegisterFormErrors | undefined>();
  const router = useRouter();

  const handleSubmit = () => {
    const errors: RegisterFormErrors = {};

    if (password.trim().length === 0) errors.password = "Required";
    // Add password strength validation
    if (password && password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      password &&
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)
    ) {
      errors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }
    if (email.trim().length === 0) errors.email = "Required";
    if (country.trim().length === 0) errors.country = "Required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      console.log(state);
      router.push(ROUTES.overview);
    }
  };

  const options = [
    { value: "argentina", label: "Argentina" },
    { value: "australia", label: "Australia" },
    { value: "austria", label: "Austria" },
    { value: "belgium", label: "Belgium" },
    { value: "brazil", label: "Brazil" },
    { value: "bulgaria", label: "Bulgaria" },
    { value: "canada", label: "Canada" },
    { value: "chile", label: "Chile" },
    { value: "china", label: "China" },
    { value: "colombia", label: "Colombia" },
    { value: "croatia", label: "Croatia" },
    { value: "czech-republic", label: "Czech Republic" },
    { value: "denmark", label: "Denmark" },
    { value: "egypt", label: "Egypt" },
    { value: "estonia", label: "Estonia" },
    { value: "finland", label: "Finland" },
    { value: "france", label: "France" },
    { value: "germany", label: "Germany" },
    { value: "greece", label: "Greece" },
    { value: "hong-kong", label: "Hong Kong" },
    { value: "hungary", label: "Hungary" },
    { value: "india", label: "India" },
    { value: "ireland", label: "Ireland" },
    { value: "italy", label: "Italy" },
    { value: "japan", label: "Japan" },
    { value: "latvia", label: "Latvia" },
    { value: "lithuania", label: "Lithuania" },
    { value: "mexico", label: "Mexico" },
    { value: "netherlands", label: "Netherlands" },
    { value: "new-zealand", label: "New Zealand" },
    { value: "niger", label: "Niger" },
    { value: "nigeria", label: "Nigeria" },
    { value: "norway", label: "Norway" },
    { value: "peru", label: "Peru" },
    { value: "poland", label: "Poland" },
    { value: "portugal", label: "Portugal" },
    { value: "romania", label: "Romania" },
    { value: "russia", label: "Russia" },
    { value: "saudi-arabia", label: "Saudi Arabia" },
    { value: "singapore", label: "Singapore" },
    { value: "slovakia", label: "Slovakia" },
    { value: "slovenia", label: "Slovenia" },
    { value: "south-africa", label: "South Africa" },
    { value: "south-korea", label: "South Korea" },
    { value: "spain", label: "Spain" },
    { value: "sweden", label: "Sweden" },
    { value: "switzerland", label: "Switzerland" },
    { value: "turkey", label: "Turkey" },
    { value: "uae", label: "United Arab Emirates" },
    { value: "uk", label: "United Kingdom" },
    { value: "usa", label: "United States" },
    { value: "venezuela", label: "Venezuela" },
  ];

  return (
    <form className={styles.form}>
      <Select
        label="Country / Region of residence"
        options={options}
        error={error?.country}
        value={country}
        onChange={(e) =>
          setState((prev) => ({ ...prev, country: e.target.value }))
        }
      />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="John@website.com"
        value={email}
        onChange={(e) =>
          setState((prev) => ({ ...prev, email: e.target.value }))
        }
        error={error?.email}
        styleType="style2"
      />
      <Input
        name="password"
        label="Password"
        placeholder="********"
        type="password"
        value={password}
        onChange={(e) =>
          setState((prev) => ({ ...prev, password: e.target.value }))
        }
        error={error?.password}
        styleType="style2"
      />
      <Button onClick={handleSubmit}>Register</Button>
    </form>
  );
};

export { RegisterForm };
