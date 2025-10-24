import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <main className="container">
      <Navbar />
      <section style={{ marginTop: "2rem" }}>
        <Outlet />
      </section>
    </main>
  );
}
