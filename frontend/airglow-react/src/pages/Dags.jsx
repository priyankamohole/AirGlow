import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Play, Pencil, Trash2, MoreVertical } from "lucide-react";

export default function Dags() {
  const [dags, setDags] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDags();
  }, []);

  const fetchDags = async () => {
    try {
      const res = await axios.get("http://localhost/dags/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDags(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load DAGs");
    } finally {
      setLoading(false);
    }
  };

  const runDag = async (id) => {
    try {
      await axios.post(
        `http://localhost/dags/run/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("DAG Started");
    } catch (err) {
      console.log(err);
      alert("Unable to start DAG");
    }
  };

  const deleteDag = async (id) => {
    if (!window.confirm("Delete this DAG?")) return;

    try {
      await axios.delete(`http://localhost/dags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchDags();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">DAGs</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/app/create-dag")}
        >
          Create DAG
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">ID</th>
              <th>DAG Name</th>
              <th>Type</th>
              <th>Schedule</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dags.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No DAGs Found
                </td>
              </tr>
            ) : (
              dags.map((dag) => (
                <tr key={dag.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{dag.id}</td>

                  <td className="font-medium">{dag.pipeline_name}</td>

                  <td>{dag.pipeline_type}</td>

                  <td>
                    {dag.scheduler_type === "manual"
                      ? "Manual"
                      : dag.cron_expression}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        dag.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {dag.status || "Active"}
                    </span>
                  </td>

                  <td>
                    {dag.created_at
                      ? new Date(dag.created_at).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => runDag(dag.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Play size={18} />
                      </button>

                      <button
                        onClick={() => navigate(`/app/edit-dag/${dag.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteDag(dag.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                      <button className="text-gray-600 hover:text-black">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 bg-white">
          <p className="text-sm text-gray-500">Showing {dags.length} DAG(s)</p>

          <div className="flex gap-2">
            <button className="w-8 h-8 rounded border hover:bg-gray-100">
              &lt;
            </button>

            <button className="w-8 h-8 rounded bg-blue-600 text-white">
              1
            </button>

            <button className="w-8 h-8 rounded border hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
