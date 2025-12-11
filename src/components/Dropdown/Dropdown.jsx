import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-toggle" onClick={() => setOpen((o) => !o)}>
        {label}
      </button>

      {open && <ul className="dropdown-menu">{children}</ul>}
    </div>
  );
}

Dropdown.Divider = function DropdownDivider() {
  return <li className="dropdown-divider"></li>;
};
