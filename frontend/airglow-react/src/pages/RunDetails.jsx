import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";

const tabs = ["Logs", "Input", "Output", "Metrics"];

export default function RunDetails() {
  // IMPORTANT:
  // App.jsx route is /app/runs/:id
  const { id } = useParams();

  const navigate = useNavigate();

  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Logs");

  const fetchRun = async () => {
    if (!id || id === "undefined") {
      console.error("Invalid run ID:", id);
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching run:", id);

      const res = await api.get(`/runs/${id}`);

      console.log("Run details:", res.data);

      setRun(res.data);
    } catch (err) {
      console.error("Failed to fetch run:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRun();

    // Refresh while the DAG is running
    const interval = setInterval(() => {
      fetchRun();
    }, 2000);

    return () => clearInterval(interval);
  }, [id]);

  // Invalid ID
  if (!id || id === "undefined") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">Invalid Run ID</h2>

        <button
          onClick={() => navigate("/app/runs")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Runs
        </button>
      </div>
    );
  }

  // Loading
  if (loading && !run) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">
          Loading Run Details...
        </div>
      </div>
    );
  }

  // Not found
  if (!run) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">Run not found</h2>

        <button
          onClick={() => navigate("/app/runs")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Runs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Back */}
      <button
        onClick={() => navigate("/app/runs")}
        className="mb-5 text-blue-600 hover:underline"
      >
        ← Back to Runs
      </button>

      <div className="rounded-xl border bg-white p-6 shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Run Details</h1>

          <p className="mt-1 text-sm text-gray-500">Run #{run.id}</p>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="grid gap-6 md:grid-cols-4">
          {/* Run ID */}
          <div>
            <p className="text-sm text-gray-500">Run ID</p>

            <h3 className="font-semibold">{run.id}</h3>
          </div>

          {/* DAG */}
          <div>
            <p className="text-sm text-gray-500">DAG</p>

            <h3 className="font-semibold">
              {run.dag_name || `DAG #${run.dag_id}`}
            </h3>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-gray-500">Status</p>

            <div className="mt-1">
              <Badge status={run.status} />
            </div>
          </div>

          {/* Execution Time */}
          <div>
            <p className="text-sm text-gray-500">Execution Time</p>

            <h3 className="font-semibold">
              {run.execution_time != null
                ? `${Number(run.execution_time).toFixed(2)} sec`
                : "--"}
            </h3>
          </div>

          {/* Started */}
          <div>
            <p className="text-sm text-gray-500">Started</p>

            <h3>
              {run.start_time
                ? new Date(run.start_time).toLocaleString()
                : "--"}
            </h3>
          </div>

          {/* Finished */}
          <div>
            <p className="text-sm text-gray-500">Finished</p>

            <h3>
              {run.end_time ? new Date(run.end_time).toLocaleString() : "--"}
            </h3>
          </div>

          {/* Extracted */}
          <div>
            <p className="text-sm text-gray-500">Records Extracted</p>

            <h3 className="font-semibold">{run.records_extracted ?? 0}</h3>
          </div>

          {/* Transformed */}
          <div>
            <p className="text-sm text-gray-500">Records Transformed</p>

            <h3 className="font-semibold">{run.records_transformed ?? 0}</h3>
          </div>

          {/* Loaded */}
          <div>
            <p className="text-sm text-gray-500">Records Loaded</p>

            <h3 className="font-semibold">{run.records_loaded ?? 0}</h3>
          </div>
        </div>

        {/* ================= TABS ================= */}

        <div className="mt-8 flex gap-6 border-b">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 ${
                tab === t
                  ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ================= TAB CONTENT ================= */}

        <div className="mt-6">
          {/* LOGS */}
          {tab === "Logs" && (
            <div className="max-h-[500px] overflow-auto rounded-lg bg-gray-900 p-5 font-mono text-sm text-green-400">
              {run.log ? (
                <pre>{JSON.stringify(run.log, null, 2)}</pre>
              ) : (
                <div>No Logs Available</div>
              )}
            </div>
          )}

          {/* INPUT */}
          {tab === "Input" && (
            <div className="rounded-lg bg-gray-100 p-5">
              <h3 className="mb-3 font-semibold text-gray-800">
                Source Configuration
              </h3>

              <pre className="overflow-auto text-sm">
                {JSON.stringify(run.log?.source || {}, null, 2)}
              </pre>
            </div>
          )}

          {/* OUTPUT */}
          {tab === "Output" && (
            <div className="rounded-lg bg-gray-100 p-5">
              <h3 className="mb-4 font-semibold text-gray-800">
                Output Information
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4">
                  <p className="text-sm text-gray-500">Output File</p>

                  <p className="mt-1 font-semibold">
                    {run.log?.output_file || "--"}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <p className="text-sm text-gray-500">Records Loaded</p>

                  <p className="mt-1 font-semibold">
                    {run.records_loaded ?? 0}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <p className="text-sm text-gray-500">Destination</p>

                  <p className="mt-1 font-semibold">
                    {run.log?.destination?.type || run.log?.destination || "--"}
                  </p>
                </div>
              </div>

              <pre className="mt-5 overflow-auto rounded-lg bg-white p-4 text-sm">
                {JSON.stringify(
                  {
                    output_file: run.log?.output_file,
                    destination: run.log?.destination,
                    records_loaded: run.records_loaded,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          )}

          {/* METRICS */}
          {tab === "Metrics" && (
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-5">
                <h4 className="font-semibold">Execution Time</h4>

                <p className="mt-2 text-2xl font-bold text-blue-700">
                  {run.execution_time != null
                    ? `${Number(run.execution_time).toFixed(2)} sec`
                    : "--"}
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-5">
                <h4 className="font-semibold">Extracted</h4>

                <p className="mt-2 text-2xl font-bold text-green-700">
                  {run.records_extracted ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-5">
                <h4 className="font-semibold">Transformed</h4>

                <p className="mt-2 text-2xl font-bold text-yellow-700">
                  {run.records_transformed ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-purple-50 p-5">
                <h4 className="font-semibold">Loaded</h4>

                <p className="mt-2 text-2xl font-bold text-purple-700">
                  {run.records_loaded ?? 0}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
