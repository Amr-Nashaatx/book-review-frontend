import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
