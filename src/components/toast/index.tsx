import React from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface ToastProps {
  type: "success" | "error" | string;
  message: string;
  onClose: () => void;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose, show }) => {
  return show
    ? createPortal(
        <div className={`${styles.toast} ${styles[type]}`}>
          <p>{message}</p>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>,
        document.body
      )
    : null;
};

export default Toast;
