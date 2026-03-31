import { Alert } from "@mantine/core";
import { InfoIcon } from "lucide-react";

export default function Error({ message = "Something went wrong." }) {
  const icon = <InfoIcon />;
  return (
    <Alert
      variant="light"
      color="brick"
      radius="md"
      withCloseButton
      title="Error"
      icon={icon}
    >
      {message}
    </Alert>
  );
}
