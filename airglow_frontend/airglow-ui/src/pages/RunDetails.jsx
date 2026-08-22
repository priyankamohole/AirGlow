import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import runService from "../services/runService";
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

export default function RunDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRun();
  }, []);

  const loadRun = async () => {
    try {
      const res = await runService.getRun(id);
      setRun(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load run details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Run Details..." />;

  if (error)
    return (
      <div className="text-red-600 font-semibold text-center mt-20">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/runs")}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Runs
        </button>
        <h1 className="text-3xl font-bold">Run #{run.id}</h1>
        <StatusBadge status={run.status} />
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Run Summary</h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="py-3 font-semibold w-48">Pipeline</td>
              <td>{run.dag_name || run.dag_id}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Status</td>
              <td><StatusBadge status={run.status} /></td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Started</td>
              <td>{run.start_time ? new Date(run.start_time).toLocaleString() : "—"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Ended</td>
              <td>{run.end_time ? new Date(run.end_time).toLocaleString() : "—"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Duration (s)</td>
              <td>{run.execution_time != null ? run.execution_time : "—"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Records Extracted</td>
              <td>{run.records_extracted ?? "—"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 font-semibold">Records Transformed</td>
              <td>{run.records_transformed ?? "—"}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold">Records Loaded</td>
              <td>{run.records_loaded ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Logs */}
      {run.logs && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Execution Logs</h2>
          <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-auto max-h-96 whitespace-pre-wrap">
            {typeof run.logs === "string"
              ? run.logs
              : JSON.stringify(run.logs, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
