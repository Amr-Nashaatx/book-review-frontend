import {
  Button,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";

export default function BookActionConfirmation({
  book,
  close,
  opened,
  onConfirm,
  onActionLoading,
  title = "Confirm Book Action",
  description = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  return (
    <Modal onClose={close} opened={opened} centered title={title} size="lg">
      <Stack gap="lg">
        <Text c="dimmed">{description}</Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Paper withBorder radius="md" p="md">
            <Text size="xs" tt="uppercase" fw={700} c="copper.5">
              Book title
            </Text>
            <Text mt={6} fw={600}>
              {book.title}
            </Text>
          </Paper>

          <Paper withBorder radius="md" p="md">
            <Text size="xs" tt="uppercase" fw={700} c="copper.5">
              Chapters
            </Text>
            <Text mt={6} fw={600}>
              {book.chapters.length}
            </Text>
          </Paper>
        </SimpleGrid>

        <Group>
          <Button onClick={onConfirm} loading={onActionLoading}>
            {confirmLabel}
          </Button>
          <Button variant="outline" onClick={close} disabled={onActionLoading}>
            {cancelLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
