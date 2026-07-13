import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlay } from "react-icons/fa";

export default function DagTable({ dags, onDelete, onRun }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";

      case "paused":
        return "bg-yellow-100 text-yellow-700";

      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-4">Name</th>

            <th className="text-left px-6 py-4">Description</th>

            <th className="text-left px-6 py-4">Schedule</th>

            <th className="text-left px-6 py-4">Status</th>

            <th className="text-left px-6 py-4">Created</th>

            <th className="text-center px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {dags.map((dag) => (
            <tr key={dag.id} className="border-b hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-semibold">{dag.name}</td>

              <td className="px-6 py-4 text-gray-600">{dag.description}</td>

              <td className="px-6 py-4">{dag.schedule}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    dag.status,
                  )}`}
                >
                  {dag.status}
                </span>
              </td>

              <td className="px-6 py-4">
                {new Date(dag.created_at).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  {/* View */}

                  <button
                    onClick={() => navigate(`/dags/${dag.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye size={18} />
                  </button>

                  {/* Edit */}

                  <button
                    onClick={() => navigate(`/dags/edit/${dag.id}`)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEdit size={18} />
                  </button>

                  {/* Run */}

                  <button
                    onClick={() => onRun(dag.id)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <FaPlay size={18} />
                  </button>

                  {/* Delete */}

                  <button
                    onClick={() => onDelete(dag.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
