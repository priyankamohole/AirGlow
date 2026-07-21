import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/runs")
      .then((res) => {
        setRuns(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading Runs...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Runs</h1>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="p-4">Run ID</th>
              <th>DAG</th>
              <th>Status</th>
              <th>Started</th>
              <th>Duration</th>
              <th>Records</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr key={run.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{run.id}</td>

                <td>{run.dag_name}</td>

                <td>
                  <Badge status={run.status} />
                </td>

                <td>{run.start_time}</td>

                <td>{run.duration || "--"}</td>

                <td>{run.records || 0}</td>

                <td>
                  <Link
                    to={`/app/runs/${run.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {runs.length === 0 && (
          <div className="text-center p-10 text-gray-500">No runs found.</div>
        )}
      </div>
    </div>
  );
}
