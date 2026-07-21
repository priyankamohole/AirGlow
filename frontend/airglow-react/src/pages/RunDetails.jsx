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

  useEffect(() => {
    api
      .get(`/runs/${id}`)
      .then((res) => setRun(res.data))
      .catch(console.error);
  }, [id]);

  if (!run) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <button
        onClick={() => navigate("/app/runs")}
        className="mb-5 text-blue-600 hover:underline"
      >
        ← Back to Runs
      </button>

      <div className="bg-white rounded-xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-6">Run Details</h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-gray-500">Run ID</p>
            <h3>{run.id}</h3>
          </div>

          <div>
            <p className="text-gray-500">DAG</p>
            <h3>{run.dag_name}</h3>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <Badge status={run.status} />
          </div>

          <div>
            <p className="text-gray-500">Start Time</p>
            <h3>{run.start_time}</h3>
          </div>

          <div>
            <p className="text-gray-500">End Time</p>
            <h3>{run.end_time || "--"}</h3>
          </div>

          <div>
            <p className="text-gray-500">Duration</p>
            <h3>{run.duration || "--"}</h3>
          </div>

          <div>
            <p className="text-gray-500">Records Extracted</p>
            <h3>{run.records_extracted || 0}</h3>
          </div>

          <div>
            <p className="text-gray-500">Records Loaded</p>
            <h3>{run.records_loaded || 0}</h3>
          </div>
        </div>

        <div className="flex border-b mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 ${
                tab === t
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Logs" && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
            {run.logs?.length ? (
              run.logs.map((log, index) => (
                <div key={index}>
                  [{log.time}] {log.message}
                </div>
              ))
            ) : (
              <div>No logs available.</div>
            )}
          </div>
        )}

        {tab !== "Logs" && (
          <div className="text-center text-gray-500 py-16">
            No {tab} available.
          </div>
        )}
      </div>
    </div>
  );
}
