import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const res = await axios.post(
        `http://localhost/dags/${id}/run`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
    } catch (err) {
      console.error(err.response?.status);
      console.error(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  // const runDag = async (id) => {
  //   try {
  //     await axios.post(
  //       `http://localhost/dags/${id}/run`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     alert("DAG Started");
  //   } catch (err) {
  //     console.log(err);
  //     alert("Unable to start DAG");
  //   }
  // };

  // const deleteDag = async (id) => {
  //   if (!window.confirm("Delete this DAG?")) return;

  //   try {
  //     await axios.delete(`http://localhost/dags/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     fetchDags();
  //   } catch (err) {
  //     console.log(err);
  //     alert("Delete failed");
  //   }
  // };

  const deleteDag = async (id) => {
    if (!window.confirm("Delete this DAG?")) return;

    try {
      const res = await axios.delete(`http://localhost/dags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      fetchDags();
    } catch (err) {
      console.error(err.response?.status);
      console.error(err.response?.data);
      alert(JSON.stringify(err.response?.data));
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">DAGs</h1>

        <button
          onClick={() => navigate("/app/create-dag")}
          className="w-full sm:w-auto rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Create DAG
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-[900px] w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">ID</th>
              <th className="p-4">DAG Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Schedule</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dags.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  No DAGs Found
                </td>
              </tr>
            ) : (
              dags.map((dag) => (
                <tr key={dag.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="p-4">{dag.id}</td>

                  <td className="p-4 font-medium whitespace-nowrap">
                    {dag.dag_name}
                  </td>

                  <td className="p-4">{dag.dag_type}</td>

                  <td className="p-4 whitespace-nowrap">
                    {dag.scheduler_type === "manual"
                      ? "Manual"
                      : dag.cron_expression}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {dag.created_at
                      ? new Date(dag.created_at).toLocaleString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => runDag(dag.id)}
                        className="rounded p-1 text-green-600 hover:bg-green-100"
                      >
                        <Play size={18} />
                      </button>

                      <button
                        onClick={() => navigate(`/app/edit-dag/${dag.id}`)}
                        className="rounded p-1 text-blue-600 hover:bg-blue-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteDag(dag.id)}
                        className="rounded p-1 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>

                      <button className="rounded p-1 text-gray-600 hover:bg-gray-100">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white px-6 py-4 shadow">
        <p className="text-sm text-gray-500">Showing {dags.length} DAG(s)</p>

        <div className="flex justify-center gap-2">
          <button className="h-8 w-8 rounded border hover:bg-gray-100">
            &lt;
          </button>

          <button className="h-8 w-8 rounded bg-blue-600 text-white">1</button>

          <button className="h-8 w-8 rounded border hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
