import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  error?: string;
  parentClassName?: string
}

const Select: React.FC<InputProps> = (props) => {
  const { className, type = "text", label, error, parentClassName, ...rest } = props;

  return (
    <div
      className={`${type === "checkbox" ? `${styles.checkboxWrap}` : styles.style2} ${parentClassName || ""}`}
    >
      {label && <label className={styles.label}>{label} </label>}
      <div className={styles.selectWrapper} >
        <select {...rest} className={`${styles.select} ${className || ""}`}>
          <option value={"select"}>choose an option</option>
          <option value={"anser"}>anser</option>
        </select>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export { Select };
