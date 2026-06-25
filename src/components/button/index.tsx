

import * as React from "react";
import styles from "./styles.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: any;
  className?: string;
  variant?:
  | "fill-red"
  | "fill-white"
  | "ghost-red"
  | "ghost-white"
  | "outline-white"
  | "outline-red"
  | "grey";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const Spinner = () => (
  <span className={styles.spinner} aria-hidden="true" />
);

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "fill-red",
    size = "medium",
    className,
    onClick,
    disabled,
    fullWidth,
    loading,
    ...rest
  } = props;

  // loading implies disabled — you should never be able to double-submit
  // a form while a request is already in flight.
  const isDisabled = disabled || loading;

  return (
    <button
      suppressHydrationWarning
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={(e) => {
        if (loading) return;
        onClick?.(e);
      }}
      className={`
        ${styles.btn} 
        ${styles[`btn--${variant}`]} 
        ${styles[`btn--${size}`]}
        ${fullWidth ? styles["btn--fullWidth"] : ""} 
        ${loading ? styles["btn--loading"] : ""}
        ${className || ""}
      `}
    >
      {loading && <Spinner />}
      <span className={loading ? styles.btn_label_loading : undefined}>
        {children}
      </span>
    </button>
  );
};

export { Button };
