import { FileInput } from "@mantine/core";

export default function UploadField({
  title,
  onChange,
  name,
  error,
  description,
}) {
  return (
    <FileInput
      label={title}
      name={name}
      accept="image/*"
      onChange={(file) =>
        onChange({
          target: {
            name,
            type: "file",
            files: file ? [file] : [],
          },
        })
      }
      error={error}
      description={description}
      placeholder="Choose a cover image"
      clearable
    />
  );
}
