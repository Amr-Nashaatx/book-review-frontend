import { useGenreOptions } from "../hooks/useGenreOptions";
import { useBooksStore } from "../stores/booksStore";
import { Button, Grid, MultiSelect, Select, TextInput } from "@mantine/core";

export default function BookFilters({ onApplyFilters }) {
  const filters = useBooksStore((s) => s.filters);
  const setFilters = useBooksStore((s) => s.setFilters);
  const clearFilters = useBooksStore((s) => s.clearFilters);
  const genres = useGenreOptions();
  const options = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onApplyFilters(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid className="filters" grow>
        <Grid.Col>
          <MultiSelect
            placeholder="Genres"
            data={options}
            value={filters.genre}
            onChange={(value) => setFilters({ genre: value })}
            searchable
            clearable
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            type="text"
            placeholder="Author"
            value={filters.author}
            onChange={(e) => setFilters({ author: e.target.value })}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            value={filters.rating || null}
            placeholder="Rating"
            onChange={(value) =>
              setFilters({
                rating: value ?? "",
              })
            }
            data={Array.from({ length: 5 }, (_, i) => i + 1).map((idx) => ({
              value: `${parseInt(idx)}`,
              label: `+${idx}`,
            }))}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            value={filters.sort || null}
            defaultValue={"title"}
            placeholder="Sort By"
            data={[
              { value: "title", label: "Title (A–Z)" },
              { value: "averageRating", label: "Rating (High → Low)" },
              { value: "publishedYear", label: "Newest First" },
            ]}
            onChange={(value) => setFilters({ sort: value ?? "" })}
          />
        </Grid.Col>

        <Grid.Col>
          <Button
            className="outline"
            type="button"
            variant="subtle"
            style={{ marginRight: "1rem" }}
            onClick={() => clearFilters()}
          >
            Clear Filters
          </Button>

          <Button type="submit">Apply Filters</Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
