import { useRef } from "react";
import "./AnimatedListItem.css";

export default function AnimatedListItem({
  children,
  isRemoving,
  isCollapsing,
  className = "",
  ...props
}) {
  const ref = useRef(null);

  // Capture initial styles for collapse animation
  const styleVars = {
    "--initial-height": ref.current?.offsetHeight + "px",
    "--initial-margin-top":
      ref.current?.style.marginTop ||
      getComputedStyle(ref.current || document.body).marginTop,
    "--initial-margin-bottom":
      ref.current?.style.marginBottom ||
      getComputedStyle(ref.current || document.body).marginBottom,
    "--initial-padding-top":
      ref.current?.style.paddingTop ||
      getComputedStyle(ref.current || document.body).paddingTop,
    "--initial-padding-bottom":
      ref.current?.style.paddingBottom ||
      getComputedStyle(ref.current || document.body).paddingBottom,
    "--initial-border-width":
      ref.current?.style.borderBottomWidth ||
      getComputedStyle(ref.current || document.body).borderBottomWidth,
  };

  return (
    <li
      ref={ref}
      className={`animated-list-item ${className} ${
        isRemoving ? "slide-out" : ""
      } ${isCollapsing ? "collapse" : ""}`}
      style={{ ...styleVars, ...props.style }}
      {...props}
    >
      {children}
    </li>
  );
}
