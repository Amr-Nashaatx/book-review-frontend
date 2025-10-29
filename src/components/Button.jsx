import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  to,
  variant = "primary",
  onClick,
  children,
  ...props
}) {
  const className = `button-link button-${variant}`;

  if (to) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
}
