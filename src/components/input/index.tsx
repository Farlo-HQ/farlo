import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  type?: "text" | "number" | "email" | "checkbox";
  error?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { onChange, value, className, type = "text", label, name, error, ...rest } = props;

  return (
    <div className={type === "checkbox" ? styles.checkboxWrap : ""}>
      {label && <label className={styles.label}>{label} </label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${className || ""}`}
        {...rest}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { onChange, value, className, label, name, error, ...rest } = props;

  return (
    <div>
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
