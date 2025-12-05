import { useEffect, useState } from "react";
import "./Toast.css";

export default function Toast({ message, onClose, duration = 3000 }) {
  const [toastClose, setToastClose] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setToastClose(true);
      setTimeout(onClose, 500);
    }, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);
  return (
    <div className={`toast ${toastClose ? "toast-closing" : ""}`}>
      <p>{message}</p>
    </div>
  );
}
