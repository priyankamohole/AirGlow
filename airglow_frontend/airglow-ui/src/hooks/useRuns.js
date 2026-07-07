import { useEffect, useState } from "react";
import runService from "../services/runService";

export default function useRuns() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRuns = async () => {
    try {
      setLoading(true);

      const res = await runService.getRuns();

      setRuns(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load runs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  const triggerRun = async (pipelineId) => {
    await runService.triggerRun(pipelineId);
    fetchRuns();
  };

  return {
    runs,
    loading,
    error,
    fetchRuns,
    triggerRun,
  };
}
