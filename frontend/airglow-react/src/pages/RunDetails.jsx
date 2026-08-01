import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";

const tabs = ["Logs", "Input", "Output", "Metrics"];

export default function RunDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [run, setRun] = useState(null);
  const [tab, setTab] = useState("Logs");

  const fetchRun = async () => {
    try {
      const res = await api.get(`/runs/${id}`);
      setRun(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRun();

    const interval = setInterval(fetchRun, 2000);

    return () => clearInterval(interval);
  }, [id]);

  if (!run) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <button
        onClick={() => navigate("/app/runs")}
        className="mb-5 text-blue-600 hover:underline"
      >
        ← Back to Runs
      </button>

      <div className="rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-8 text-2xl font-bold">Run Details</h1>

        {/* Summary */}

        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">Run ID</p>
            <h3 className="font-semibold">{run.id}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">DAG</p>
            <h3 className="font-semibold">
              {run.dag_name || `DAG #${run.dag_id}`}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge status={run.status} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Execution Time</p>
            <h3>{run.execution_time ?? "--"} sec</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Started</p>
            <h3>
              {run.start_time
                ? new Date(run.start_time).toLocaleString()
                : "--"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Finished</p>
            <h3>
              {run.end_time ? new Date(run.end_time).toLocaleString() : "--"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Extracted</p>
            <h3>{run.records_extracted}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Loaded</p>
            <h3>{run.records_loaded}</h3>
          </div>
        </div>

        {/* Tabs */}

        <div className="mt-8 flex gap-6 border-b">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 ${
                tab === t
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {/* Logs */}

          {tab === "Logs" && (
            <div className="rounded-lg bg-gray-900 p-5 font-mono text-sm text-green-400">
              {run.log ? (
                <pre>{JSON.stringify(run.log, null, 2)}</pre>
              ) : (
                <div>No Logs Available</div>
              )}
            </div>
          )}

          {/* Input */}

          {tab === "Input" && (
            <pre className="overflow-auto rounded-lg bg-gray-100 p-4">
              {JSON.stringify(run.log?.source || {}, null, 2)}
            </pre>
          )}

          {/* Output */}

          {tab === "Output" && (
            <pre className="overflow-auto rounded-lg bg-gray-100 p-4">
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
          )}

          {/* Metrics */}

          {tab === "Metrics" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="font-semibold">Execution Time</h4>
                <p>{run.execution_time ?? 0} sec</p>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="font-semibold">Records Extracted</h4>
                <p>{run.records_extracted}</p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h4 className="font-semibold">Records Transformed</h4>
                <p>{run.records_transformed}</p>
              </div>

              <div className="rounded-lg bg-purple-50 p-4">
                <h4 className="font-semibold">Records Loaded</h4>
                <p>{run.records_loaded}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
