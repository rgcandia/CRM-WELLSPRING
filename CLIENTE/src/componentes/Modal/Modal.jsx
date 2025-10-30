import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // evita cierre al hacer clic dentro
      >
        {children}
      </div>
    </div>
  );
}
