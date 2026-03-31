import { FileInput, Progress, Stack } from "@mantine/core";

export default function UploadFieldWithProgress({
  title,
  uploadHandler,
  name,
  isUploading = false,
  uploadProgress = 0,
}) {
  return (
    <Stack mt={12} w={200}>
      <label htmlFor="upload">{title}</label>
      <FileInput
        id="upload"
        accept="image/*"
        name={name}
        onChange={uploadHandler}
        disabled={isUploading}
      />

      {isUploading && <Progress value={uploadProgress} striped animated />}
    </Stack>
  );
}
