const ErrorMsg = ({ message }) => (
  <small
    style={{
      color: "var(--pico-form-element-invalid-border-color)",
      marginBottom: "1rem",
      display: "block",
    }}
  >
    {message}
  </small>
);

export default ErrorMsg;
