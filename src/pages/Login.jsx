import { useState } from "react";
import Error from "../components/Error";

import { useSubmitForm } from "../hooks/useSubmitForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { formErrors, submitForm } = useSubmitForm(
    ["email", "password"],
    "/auth/login"
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm(formData);
    navigate("/profile");
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
              required
            />
            {formErrors.email && <Error message={formErrors.email} />}
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
              required
              minLength="6"
            />
            {formErrors.password && <Error message={formErrors.password} />}
          </label>
          {formErrors.general && <Error message={formErrors.general} />}
          <button type="submit">Login</button>
        </form>
      </article>
    </main>
  );
}
