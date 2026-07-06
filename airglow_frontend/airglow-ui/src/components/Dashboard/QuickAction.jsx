import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => navigate("/dags")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
      >
        ➕ Create DAG
      </button>

      <button
        onClick={() => navigate("/runs")}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow"
      >
        ▶ Run History
      </button>

      <button
        onClick={() => navigate("/outputs")}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg shadow"
      >
        📂 Outputs
      </button>

      <button
        onClick={() => navigate("/webhooks")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg shadow"
      >
        🔗 Webhooks
      </button>
    </div>
  );
}
