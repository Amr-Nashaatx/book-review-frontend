import { Button } from "@mantine/core";

export default function LoadMore({ hasNextPage, onLoadMore, isLoading }) {
  if (!hasNextPage) return null;
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Button size="lg" disabled={isLoading} onClick={onLoadMore}>
        {isLoading ? "Loading..." : "Load More ..."}
      </Button>
    </div>
  );
}
