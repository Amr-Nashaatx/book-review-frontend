import { Link } from "react-router-dom";
import "./Shelf.css";
import AnimatedListItem from "../AnimateListItem/AnimatedListItem";
import { Button, Card, Group, Loader, Text } from "@mantine/core";
import { Eye, Trash } from "lucide-react";

export default function Shelf({
  shelf,
  handleRemoveShelf,
  isRemoving,
  isCollapsing,
}) {
  return (
    <AnimatedListItem
      key={shelf._id}
      className="shelf-card"
      isRemoving={isRemoving}
      isCollapsing={isCollapsing}
    >
      <Card>
        <Group>
          <Text fw="bold" c={"copper.3"}>
            {shelf.name}{" "}
          </Text>
          <Text fz="sm" c={"copper.1"}>
            ({shelf.booksCount})
          </Text>
        </Group>
        <Group align="center" mt={"md"}>
          <Link to={`/shelves/${shelf._id}`} className="shelf-link">
            <Button c={"copper.1"}>
              <Eye size={20} />
            </Button>
          </Link>

          <Button
            variant="outline"
            c={"brick.5"}
            bg={"brick.9"}
            mt={7}
            disabled={isRemoving}
            onClick={() => handleRemoveShelf(shelf._id)}
          >
            {isRemoving ? <Loader color={"copper.6"} /> : <Trash size={20} />}
          </Button>
        </Group>
      </Card>
    </AnimatedListItem>
  );
}
