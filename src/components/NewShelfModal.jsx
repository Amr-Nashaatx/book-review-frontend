import { Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";

export default function NewShelfModal({ onCreate, opened, open, close }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description });
  };

  return (
    <Modal opened={opened} onClose={close} title="Create Shelf" centered>
      <Stack>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Shelf Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextInput
            label=" Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Group mt={24}>
            <Button type="submit">Create Shelf</Button>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
}
