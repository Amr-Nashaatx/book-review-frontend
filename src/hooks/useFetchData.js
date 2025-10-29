import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

export const useFetchData = (url, name) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}${url}`);
        setData(res.data.data[name]);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
