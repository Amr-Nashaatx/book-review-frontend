export default function UploadFieldWithProgress({
  title,
  uploadHandler,
  name,
  isUploading = false,
  uploadProgress = 0,
}) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <label htmlFor="upload">{title}</label>
      <input
        id="upload"
        name={name}
        type="file"
        accept="image/*"
        onChange={uploadHandler}
        disabled={isUploading}
      />
      {isUploading && <progress value={uploadProgress} max="100" />}
    </div>
  );
}
