import { useState } from "react";

import { useSubmitForm } from "../hooks/useSubmitForm";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formErrors, submitForm } = useSubmitForm(
    ["email", "password"],
    "/auth/login",
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await submitForm(formData);
    setIsSubmitting(false);

    if (success) navigate("/profile");
  };

  return (
    <main className="container">
      <article style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <header style={{ textAlign: "center", marginTop: "2rem" }}>
            <h1>Login</h1>
            <p>Welcome back! Continue discovering new books.</p>
          </header>

          <label htmlFor="email">
            Email Address
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              // Stays neutral unless an error is present
              aria-invalid={formErrors.email ? "true" : undefined}
              required
            />
            {formErrors.email && <ErrorMsg message={formErrors.email} />}
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={formErrors.password ? "true" : undefined}
              required
            />
            {formErrors.password && <ErrorMsg message={formErrors.password} />}
          </label>

          {formErrors.general && <ErrorMsg message={formErrors.general} />}

          <button type="submit" aria-busy={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </article>
    </main>
  );
}
