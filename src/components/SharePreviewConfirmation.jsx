import {
  Badge,
  Button,
  Group,
  Modal,
  NumberInput,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

export default function SharePreviewConfirmation({
  close,
  opened,
  bookId,
  onConfirm,
  onActionLoading,
}) {
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(bookId, email, duration);
  };
  return (
    <Modal
      onClose={close}
      opened={opened}
      centered
      title="Share Confirmation"
      size="lg"
    >
      <Text c="dimmed">Add who you wish to share the preview with</Text>
      <Stack gap="lg">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="User email address"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <NumberInput
              label="Share duration"
              description="set a duration for share expire (in ms)"
              placeholder="3600"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Stack>

          <Group mt={"lg"}>
            <Button type="submit" loading={onActionLoading}>
              Share
            </Button>
            <Button
              variant="outline"
              onClick={close}
              disabled={onActionLoading}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
}
