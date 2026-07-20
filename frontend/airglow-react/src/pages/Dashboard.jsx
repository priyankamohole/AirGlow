import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_dags: 0,
    total_runs: 0,
    successful_runs: 0,
    failed_runs: 0,
    files_generated: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      title: "Total DAGs",
      value: stats.total_dags,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Runs",
      value: stats.total_runs,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Successful Runs",
      value: stats.successful_runs,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Failed Runs",
      value: stats.failed_runs,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Files Generated",
      value: stats.files_generated,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-gray-500">Monitor your AirGlow Pipelines</p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6 border"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
            >
              📊
            </div>

            <h3 className="text-gray-500 mt-4">{card.title}</h3>

            <p className="text-4xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <Link
          to="/app/dags"
          className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">DAG Management</h2>

          <p className="text-gray-500 mt-2">Create, edit and execute DAGs.</p>
        </Link>

        <Link
          to="/app/runs"
          className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Pipeline Runs</h2>

          <p className="text-gray-500 mt-2">View execution history.</p>
        </Link>

        <Link
          to="/app/webhooks"
          className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Webhooks</h2>

          <p className="text-gray-500 mt-2">Manage webhook endpoints.</p>
        </Link>
      </div>

      {/* Recent Activity */}

      <div className="mt-8 bg-white rounded-xl shadow border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Pipeline Summary</h2>
        </div>

        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4">Metric</th>

              <th className="text-left px-6 py-4">Value</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">Total DAGs</td>
              <td className="px-6 py-4">{stats.total_dags}</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">Total Runs</td>
              <td className="px-6 py-4">{stats.total_runs}</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">Successful Runs</td>
              <td className="px-6 py-4">
                <Badge status="Success" />
                <span className="ml-2">{stats.successful_runs}</span>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">Failed Runs</td>
              <td className="px-6 py-4">
                <Badge status="Failed" />
                <span className="ml-2">{stats.failed_runs}</span>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">Files Generated</td>
              <td className="px-6 py-4">{stats.files_generated}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
