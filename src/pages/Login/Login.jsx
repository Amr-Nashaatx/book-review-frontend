import { useState } from "react";
import {
  Alert,
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

import { useSubmitForm } from "../../hooks/useSubmitForm";
import "./Login.css";

const inputClassNames = {
  label: "login-page__label",
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { formErrors, isLoading, submitForm } = useSubmitForm("/auth/login");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(formData);

    if (success) navigate("/profile");
  };

  return (
    <main className="login-page">
      <Container size={460} py={0}>
        <Paper
          withBorder
          radius="xl"
          shadow="xl"
          p={{ base: "xl", sm: "2.5rem" }}
          className="login-page__shell"
        >
          <Stack gap="xl">
            <header>
              <Text
                span
                fw={700}
                tt="uppercase"
                size="xs"
                className="login-page__eyebrow"
              >
                BookVerse
              </Text>
              <Title order={1} mt="sm" className="login-page__title">
                Welcome back
              </Title>
              <Text c="dimmed" mt="xs">
                Continue discovering new books, tracking your shelves, and
                sharing reviews with your reading circle.
              </Text>
            </header>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  autoComplete="email"
                  required
                  size="md"
                  classNames={inputClassNames}
                />

                <PasswordInput
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  autoComplete="current-password"
                  required
                  size="md"
                  classNames={inputClassNames}
                />

                {formErrors.general && (
                  <Alert color="red" variant="light" radius="md">
                    {formErrors.general}
                  </Alert>
                )}

                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  loading={isLoading}
                  loaderProps={{ type: "dots" }}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Stack>
            </form>

            <Text ta="center" size="sm" c="dimmed">
              New here?{" "}
              <Anchor component={Link} to="/signup" fw={600}>
                Create an account
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}
