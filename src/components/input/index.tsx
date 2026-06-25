import React, { InputHTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  error?: string;
  styleType?: "style1" | "style2";
}

const Input: React.FC<InputProps> = (props) => {
  const {
    onChange,
    value,
    className,
    type = "text",
    label,
    name,
    error,
    styleType = "style1",
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const resolvedType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div
      className={type === "checkbox" ? styles.checkboxWrap : styles[styleType]}
    >
      {label && <label className={styles.label}>{label} </label>}
      <div className={isPasswordField ? styles.passwordWrap : undefined}>
        <input
          suppressHydrationWarning
          name={name}
          type={resolvedType}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${className || ""}`}
          {...rest}
        />
        {isPasswordField && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
          </button>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  error?: string;
  styleType?: "style1" | "style2";
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    onChange,
    value,
    className,
    label,
    name,
    error,
    styleType = "style1",
    ...rest
  } = props;

  return (
    <div className={styles[styleType]}>
      {label && <label className={styles.label}>{label} </label>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${styles.textarea} ${className || ""}`}
        {...rest}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export { Input, TextArea };
