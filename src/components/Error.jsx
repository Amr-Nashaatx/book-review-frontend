export default function Error({ message = "Something went wrong." }) {
  return (
    <article
      style={{
        border: "1px solid var(--pico-del-color)",
        color: "var(--pico-del-color)",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <header>
        <strong>Error</strong>
      </header>
      <p>{message}</p>
    </article>
  );
}
