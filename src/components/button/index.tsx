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
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "fill-red",
    className,
    onClick,
    disabled,
    ...rest
  } = props;
  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      className={`${styles.btn} ${styles[`btn--${variant}`]} ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
