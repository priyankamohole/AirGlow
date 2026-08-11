import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRuns = async () => {
    try {
      const res = await api.get("/runs");
      setRuns(res.data);
    } catch (err) {
      console.error("Failed to fetch runs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();

    const interval = setInterval(fetchRuns, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Runs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">DAG Runs</h1>

        <p className="text-gray-500">Monitor your DAG execution status</p>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-[950px] w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">Run ID</th>

              <th>DAG</th>

              <th>Status</th>

              <th>Started</th>

              <th>Duration</th>

              <th>Extracted</th>

              <th>Transformed</th>

              <th>Loaded</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {runs.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-gray-500">
                  No Runs Found
                </td>
              </tr>
            ) : (
              runs.map((run) => (
                <tr key={run.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">#{run.id}</td>

                  <td>{run.dag_name || `DAG #${run.dag_id}`}</td>

                  <td>
                    <Badge status={run.status} />
                  </td>

                  <td>
                    {run.start_time
                      ? new Date(run.start_time).toLocaleString()
                      : "--"}
                  </td>

                  <td>
                    {run.execution_time != null
                      ? `${run.execution_time.toFixed(2)} sec`
                      : "--"}
                  </td>

                  <td>{run.records_extracted ?? 0}</td>

                  <td>{run.records_transformed ?? 0}</td>

                  <td>{run.records_loaded ?? 0}</td>

                  <td className="text-center">
                    <Link
                      to={`/app/runs/${run.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-white px-6 py-4 shadow">
        <p className="text-sm text-gray-500">Total Runs: {runs.length}</p>
      </div>
    </div>
  );
}
