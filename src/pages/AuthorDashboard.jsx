import { useLocation } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import { useEffect, useState } from "react";
import { sendRequest } from "../utils/sendRequest";

export function AuthorDashboard() {
  const location = useLocation();
  const [toastMsg, setToastMsg] = useState(location.state?.message || "");
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    async function fetchAuthorData() {
      const data = await sendRequest({
        url: `/authors/me`,
        method: "get",
      });
      setAuthorData(data.author);
    }
    fetchAuthorData();
  }, []);
  return (
    <article>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
      <h2>Welcome to your Dashboard</h2>
      {/* ... rest of dashboard ... */}
    </article>
  );
}
