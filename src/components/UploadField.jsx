export default function UploadField({ title, onChange, name }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <label htmlFor="upload">{title}</label>
      <input
        id="upload"
        name={name}
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
}
