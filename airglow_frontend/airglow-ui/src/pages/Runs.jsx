import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import useRuns from "../hooks/useRuns";
import Loader from "../components/Loader";

function StatusBadge({ status }) {
  const colors = {
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    Queued: "bg-yellow-100 text-yellow-700",
    running: "bg-blue-100 text-blue-700",
  };
  const cls = colors[status] || "bg-gray-100 text-gray-700";
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export default function Runs() {
  const navigate = useNavigate();
  const { runs, loading, error, fetchRuns } = useRuns();
  const [search, setSearch] = useState("");

  const filtered = runs.filter((run) => {
    const name = run.dag_name || String(run.dag_id) || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) return <Loader text="Loading Runs..." />;

  if (error) return <div className="text-red-600 font-semibold">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pipeline Runs</h1>
          <p className="text-gray-500">History of all pipeline executions.</p>
        </div>

        <button
          onClick={fetchRuns}
          className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300"
          title="Refresh"
        >
          <FaSyncAlt />
        </button>
      </div>

      <div className="mb-5">
        <input
          className="border p-3 rounded-lg w-full max-w-sm"
          placeholder="Search by pipeline name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-lg">
          No runs found.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">#</th>
                <th className="text-left px-6 py-4">Pipeline</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Started</th>
                <th className="text-left px-6 py-4">Ended</th>
                <th className="text-left px-6 py-4">Duration (s)</th>
                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((run) => (
                <tr
                  key={run.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{run.id}</td>
                  <td className="px-6 py-4">{run.dag_name || run.dag_id}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={run.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {run.start_time
                      ? new Date(run.start_time).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {run.end_time
                      ? new Date(run.end_time).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {run.execution_time != null ? run.execution_time : "—"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/runs/${run.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
