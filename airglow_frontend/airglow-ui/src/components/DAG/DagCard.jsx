import { FaPlay, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DagCard({ dag, onDelete, onRun }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">{dag.name}</h2>

          <p className="text-gray-500 mt-2">{dag.description}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-white h-fit ${
            dag.status === "Active" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {dag.status}
        </span>
      </div>

      <div className="mt-5 text-sm space-y-2">
        <p>
          <strong>Type:</strong> {dag.pipeline_type}
        </p>

        <p>
          <strong>Schedule:</strong> {dag.schedule}
        </p>

        <p>
          <strong>Source:</strong> {dag.source}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onRun(dag.id)}
          className="bg-green-600 text-white p-2 rounded"
        >
          <FaPlay />
        </button>

        <button
          onClick={() => navigate(`/pipelines/edit/${dag.id}`)}
          className="bg-blue-600 text-white p-2 rounded"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(dag)}
          className="bg-red-600 text-white p-2 rounded"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
