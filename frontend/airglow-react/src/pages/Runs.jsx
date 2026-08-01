import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRuns = async () => {
    try {
      const { data } = await api.get("/runs");
      setRuns(data);
    } catch (err) {
      console.error(err);
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
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Runs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">DAG Runs</h1>
          <p className="text-gray-500">
            Monitor all pipeline executions in real time
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow border">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">Run ID</th>
              <th>DAG Name</th>
              <th>Status</th>
              <th>Started</th>
              <th>Execution</th>
              <th>Extracted</th>
              <th>Loaded</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {runs.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-500">
                  No DAG Runs Found
                </td>
              </tr>
            ) : (
              runs.map((run) => (
                <tr
                  key={run.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-semibold">#{run.id}</td>

                  <td>{run.dag_name}</td>

                  <td>
                    <Badge status={run.status} />
                  </td>

                  <td>
                    {run.start_time
                      ? new Date(run.start_time).toLocaleString()
                      : "--"}
                  </td>

                  <td>
                    {run.execution_time ? (
                      `${run.execution_time.toFixed(2)} sec`
                    ) : (
                      <span className="text-orange-600 font-medium">
                        Running...
                      </span>
                    )}
                  </td>

                  <td>{run.records_extracted}</td>

                  <td>{run.records_loaded}</td>

                  <td className="text-center">
                    <Link
                      to={`/app/runs/${run.id}`}
                      className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 shadow">
        <p className="text-sm text-gray-500">
          Total Runs: <span className="font-semibold">{runs.length}</span>
        </p>
      </div>
    </div>
  );
}
