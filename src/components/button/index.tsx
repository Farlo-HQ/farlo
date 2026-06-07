
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
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "fill-red",
    size = "medium",
    className,
    onClick,
    disabled,
    fullWidth,
    ...rest
  } = props;

  return (
    <button
      suppressHydrationWarning
      {...rest}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={`
        ${styles.btn} 
        ${styles[`btn--${variant}`]} 
        ${styles[`btn--${size}`]}
        ${fullWidth ? styles["btn--fullWidth"] : ""} 
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
};

export { Button };
