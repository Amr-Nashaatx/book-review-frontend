import { useState } from "react";
import { Link } from "react-router-dom";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formErrors, submitForm } = useSubmitForm(
    ["name", "email", "password"],
    "/auth/register",
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
            <h1>Create an Account</h1>
            <p>Join our community of book lovers and share your reviews.</p>
          </header>

          <label htmlFor="name">
            Full Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={formErrors.name ? "true" : undefined}
              required
            />
            {formErrors.name && <ErrorMsg message={formErrors.name} />}
          </label>

          <label htmlFor="email">
            Email Address
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
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

          <button type="submit" aria-busy={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          {formErrors.general && <ErrorMsg message={formErrors.general} />}

          <footer style={{ textAlign: "center" }}>
            <Link to="/login">Already have an account?</Link>
          </footer>
        </form>
      </article>
    </main>
  );
}
