import { sendRequest } from "../utils/sendRequest";
import NewShelfModal from "./NewShelfModal";
import { ChevronDown } from "lucide-react";
import { Button, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";

export default function AddToShelfDropdown({ shelves, book }) {
  const [opened, { open, close }] = useDisclosure(false);

  const onCreateShelf = async (data) => {
    try {
      const { shelf } = await sendRequest({
        url: "/shelves",
        method: "post",
        body: data,
        params: { withCredentials: true },
      });
      const newShelf = shelf;

      await sendRequest({
        url: `/shelves/${newShelf._id}/books`,
        method: "post",
        body: { bookId: book._id },
        params: { withCredentials: true },
      });

      toast.success(`Book added to ${newShelf.name}`);
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create shelf.");
    }
  };

  const handleAdd = async (shelfId) => {
    try {
      await sendRequest({
        url: `/shelves/${shelfId}/books`,
        method: "post",
        body: { bookId: book._id },
        params: { withCredentials: true },
      });
      toast.success(`Added to ${shelves.find((s) => s._id === shelfId).name}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book.");
    }
  };

  const displayShelvesItems = (shelves) => {
    const shelfItems = shelves.map((shelf) => {
      const isBookInShelf = shelf.books.includes(book._id);
      return (
        <Menu.Item handleClick={() => handleAdd(shelf._id)}>
          {isBookInShelf ? <Text fw={"bold"}>✓ {shelf.name}</Text> : shelf.name}
        </Menu.Item>
      );
    });
    return shelfItems;
  };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>
            Add to Shelf{" "}
            {<ChevronDown style={{ marginLeft: "0.3rem", padding: "0" }} />}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {shelves.length > 0 && (
            <>
              <Menu.Label>Your Shelves</Menu.Label>
              {displayShelvesItems(shelves)}
              <Menu.Divider />
            </>
          )}
          <Menu.Item onClick={open}>Add to shelf</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <NewShelfModal opened={opened} close={close} onCreate={onCreateShelf} />
    </div>
  );
}
