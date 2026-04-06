import { AppShell, Container, useComputedColorScheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  const colorScheme = useComputedColorScheme("light");
  return (
    <AppShell header={{ height: 76 }} padding="md">
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main pt={120}>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        newestOnTop={true}
        pauseOnHover
        theme={colorScheme}
      />
    </AppShell>
  );
}
