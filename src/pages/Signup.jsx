import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
              required
            />
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
              required
            />
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
          </label>

          <button type="submit">Sign Up</button>
          <footer>
            <Link to="/login">Already have an account?</Link>
          </footer>
        </form>
      </article>
    </main>
  );
}
