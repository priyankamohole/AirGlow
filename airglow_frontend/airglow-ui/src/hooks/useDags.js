import { useEffect, useState } from "react";
import dagService from "../services/dagService";

export default function useDags() {
  const [dags, setDags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDags = async () => {
    try {
      setLoading(true);

      const res = await dagService.getAllDags();

      setDags(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load pipelines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDags();
  }, []);

  const createDag = async (data) => {
    await dagService.createDag(data);
    fetchDags();
  };

  const updateDag = async (id, data) => {
    await dagService.updateDag(id, data);
    fetchDags();
  };

  const deleteDag = async (id) => {
    await dagService.deleteDag(id);
    fetchDags();
  };

  return {
    dags,
    loading,
    error,
    fetchDags,
    createDag,
    updateDag,
    deleteDag,
  };
}
