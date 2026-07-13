import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dagService from "../services/dagService";
import DeleteModal from "../components/DAG/DeleteModal";

export default function DagDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dag, setDag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    loadDag();
  }, []);

  const loadDag = async () => {
    try {
      const res = await dagService.getDag(id);
      setDag(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load pipeline.");
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    try {
      await dagService.runDag(id);
      alert("Pipeline started successfully.");
    } catch (err) {
      console.error(err);
      alert("Unable to start pipeline.");
    }
  };

  const handleDelete = async () => {
    try {
      await dagService.deleteDag(id);
      navigate("/dags");
    } catch (err) {
      console.error(err);
      alert("Unable to delete pipeline.");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading Pipeline...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{dag.name}</h1>

          <p className="text-gray-500 mt-1">{dag.description}</p>
        </div>

        <div className="space-x-3">
          <button
            onClick={handleRun}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Run Pipeline
          </button>

          <button
            onClick={() => navigate(`/pipelines/edit/${dag.id}`)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => setShowDelete(true)}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pipeline Information</h2>

          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-3 font-semibold">Name</td>

                <td>{dag.name}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-semibold">Type</td>

                <td>{dag.pipeline_type}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-semibold">Source</td>

                <td>{dag.source}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-semibold">Destination</td>

                <td>{dag.destination}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-semibold">Schedule</td>

                <td>{dag.schedule}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-semibold">Status</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      dag.status === "Active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {dag.status}
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-semibold">Created</td>

                <td>{dag.created_at}</td>
              </tr>

              <tr>
                <td className="py-3 font-semibold">Updated</td>

                <td>{dag.updated_at}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Executions</h2>

          <div className="space-y-4">
            {dag.runs && dag.runs.length > 0 ? (
              dag.runs.map((run) => (
                <div
                  key={run.id}
                  className="border rounded-lg p-4 flex justify-between"
                >
                  <div>
                    <h3 className="font-semibold">Run #{run.id}</h3>

                    <p className="text-sm text-gray-500">{run.started_at}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      run.status === "success"
                        ? "bg-green-600"
                        : run.status === "running"
                          ? "bg-blue-600"
                          : "bg-red-600"
                    }`}
                  >
                    {run.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No runs available.</div>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
