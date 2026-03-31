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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSubmitForm } from "../hooks/useSubmitForm";
import "./Signup.css";

const inputClassNames = {
  label: "signup-page__label",
};

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { formErrors, isLoading, submitForm } = useSubmitForm("/auth/register");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(formData);

    if (success) navigate("/profile");
  };

  return (
    <main className="signup-page">
      <Container size={460} py={0}>
        <Paper
          withBorder
          radius="xl"
          shadow="xl"
          p={{ base: "xl", sm: "2.5rem" }}
          className="signup-page__shell"
        >
          <Stack gap="xl">
            <header>
              <Text
                span
                fw={700}
                tt="uppercase"
                size="xs"
                className="signup-page__eyebrow"
              >
                BookVerse
              </Text>
              <Title order={1} mt="sm" className="signup-page__title">
                Create an account
              </Title>
              <Text c="dimmed" mt="xs">
                Join our community of book lovers, build your shelves, and
                share reviews with your reading circle.
              </Text>
            </header>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  type="text"
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={formErrors.name}
                  autoComplete="name"
                  required
                  size="md"
                  classNames={inputClassNames}
                />

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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  autoComplete="new-password"
                  required
                  size="md"
                  classNames={inputClassNames}
                />

                {formErrors.general && (
                  <Alert color="brick" variant="light" radius="md">
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
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </Stack>
            </form>

            <Text ta="center" size="sm" c="dimmed">
              Already have an account?{" "}
              <Anchor component={Link} to="/login" fw={600}>
                Login instead
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}
