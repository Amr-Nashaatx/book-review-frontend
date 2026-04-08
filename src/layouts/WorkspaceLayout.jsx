import { AppShell, Stack, Text, Tooltip, UnstyledButton } from "@mantine/core";
import {
  BookOpen,
  ChevronLeft,
  LayoutDashboard,
  LibraryBig,
} from "lucide-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useComputedColorScheme } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";

function WorkspaceNavButton({ icon, label, onClick, active = false }) {
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        style={{
          width: "100%",
          borderRadius: "var(--mantine-radius-md)",
          padding: "0.8rem 0.65rem",
          border: "1px solid var(--app-surface-border)",
          background: active
            ? "color-mix(in srgb, var(--mantine-color-copper-1) 82%, white 18%)"
            : "color-mix(in srgb, var(--app-surface-bg) 86%, white 14%)",
          color: "var(--mantine-color-text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "background-color 180ms ease, border-color 180ms ease, transform 180ms ease",
        }}
      >
        {icon}
      </UnstyledButton>
    </Tooltip>
  );
}

export default function WorkspaceLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const colorScheme = useComputedColorScheme("light");

  return (
    <AppShell
      padding="md"
      navbar={{ width: 86, breakpoint: 0 }}
      styles={{
        main: {
          paddingLeft: "calc(86px + var(--mantine-spacing-md) * 2)",
          paddingTop: "var(--mantine-spacing-md)",
          paddingRight: "var(--mantine-spacing-md)",
          paddingBottom: "var(--mantine-spacing-md)",
        },
      }}
    >
      <AppShell.Navbar p="sm">
        <Stack justify="space-between" h="100%">
          <Stack gap="sm">
            <div
              style={{
                textAlign: "center",
                paddingBottom: "0.25rem",
              }}
            >
              <Text fw={800} c="copper.6" size="lg">
                BV
              </Text>
              <Text size="xs" c="dimmed">
                Write
              </Text>
            </div>

            <WorkspaceNavButton
              icon={<ChevronLeft size={18} />}
              label="Back to book"
              onClick={() => navigate(`/books/${id}`)}
            />
            <WorkspaceNavButton
              icon={<BookOpen size={18} />}
              label="Chapter workspace"
              active
              onClick={() => navigate(`/books/${id}/chapters`)}
            />
          </Stack>

          <Stack gap="sm">
            <WorkspaceNavButton
              icon={<LayoutDashboard size={18} />}
              label="My books"
              onClick={() => navigate("/author/my-books")}
            />
            <WorkspaceNavButton
              icon={<LibraryBig size={18} />}
              label="Browse books"
              onClick={() => navigate("/books")}
            />
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme={colorScheme}
      />
    </AppShell>
  );
}
