import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  // type?: "text" | "number" | "email" | "checkbox";
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

  return (
    <div
      className={type === "checkbox" ? styles.checkboxWrap : styles[styleType]}
    >
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
