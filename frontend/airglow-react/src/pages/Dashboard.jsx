import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Badge from "../components/Badge";
import {
  Workflow,
  PlayCircle,
  CheckCircle,
  XCircle,
  FolderOpen,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_dags: 0,
    total_runs: 0,
    successful_runs: 0,
    failed_runs: 0,
    files_generated: 0,
  });
  const [recentRuns, setRecentRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsRes, runsRes] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/runs"),
        ]);

        setStats(statsRes.data);

        setRecentRuns(runsRes.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // const statCards = [
  //   {
  //     title: "Total DAGs",
  //     value: stats.total_dags,
  //     color: "bg-blue-100 text-blue-600",
  //   },
  //   {
  //     title: "Total Runs",
  //     value: stats.total_runs,
  //     color: "bg-purple-100 text-purple-600",
  //   },
  //   {
  //     title: "Successful Runs",
  //     value: stats.successful_runs,
  //     color: "bg-green-100 text-green-600",
  //   },
  //   {
  //     title: "Failed Runs",
  //     value: stats.failed_runs,
  //     color: "bg-red-100 text-red-600",
  //   },
  //   {
  //     title: "Files Generated",
  //     value: stats.files_generated,
  //     color: "bg-yellow-100 text-yellow-600",
  //   },
  // ];

  const statCards = [
    {
      title: "Total DAGs",
      value: stats.total_dags,
      color: "bg-blue-100 text-blue-600",
      icon: <Workflow size={28} />,
    },
    {
      title: "Total Runs",
      value: stats.total_runs,
      color: "bg-purple-100 text-purple-600",
      icon: <PlayCircle size={28} />,
    },
    {
      title: "Successful",
      value: stats.successful_runs,
      color: "bg-green-100 text-green-600",
      icon: <CheckCircle size={28} />,
    },
    {
      title: "Failed",
      value: stats.failed_runs,
      color: "bg-red-100 text-red-600",
      icon: <XCircle size={28} />,
    },
    {
      title: "Outputs",
      value: stats.files_generated,
      color: "bg-yellow-100 text-yellow-600",
      icon: <FolderOpen size={28} />,
    },
  ];

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
      </div>
    );
  }

  //   return (
  //     <div className="min-h-screen bg-slate-100 p-6">
  //       <div className="mb-8">
  //         <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

  //         <p className="text-gray-500">Monitor your AirGlow Pipelines</p>
  //       </div>

  //       {/* Stats */}

  //       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
  //         {statCards.map((card) => (
  //           <div
  //             key={card.title}
  //             className="bg-white rounded-xl shadow p-6 border"
  //           >
  //             <div
  //               className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
  //             >
  //               📊
  //             </div>

  //             <h3 className="text-gray-500 mt-4">{card.title}</h3>

  //             <p className="text-4xl font-bold mt-2">{card.value}</p>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Quick Actions */}

  //       <div className="grid lg:grid-cols-3 gap-6 mt-8">
  //         <Link
  //           to="/app/dags"
  //           className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
  //         >
  //           <h2 className="text-xl font-semibold">DAG Management</h2>

  //           <p className="text-gray-500 mt-2">Create, edit and execute DAGs.</p>
  //         </Link>

  //         <Link
  //           to="/app/runs"
  //           className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
  //         >
  //           <h2 className="text-xl font-semibold">Pipeline Runs</h2>

  //           <p className="text-gray-500 mt-2">View execution history.</p>
  //         </Link>

  //         <Link
  //           to="/app/webhooks"
  //           className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
  //         >
  //           <h2 className="text-xl font-semibold">Webhooks</h2>

  //           <p className="text-gray-500 mt-2">Manage webhook endpoints.</p>
  //         </Link>
  //       </div>

  //       {/* Recent Activity */}

  //       <div className="mt-8 bg-white rounded-xl shadow border">
  //         <div className="p-6 border-b">
  //           <h2 className="text-xl font-semibold">Pipeline Summary</h2>
  //         </div>

  //         <table className="min-w-full">
  //           <thead className="bg-gray-50">
  //             <tr>
  //               <th className="text-left px-6 py-4">Metric</th>

  //               <th className="text-left px-6 py-4">Value</th>
  //             </tr>
  //           </thead>

  //           <tbody>
  //             <tr className="border-t">
  //               <td className="px-6 py-4">Total DAGs</td>
  //               <td className="px-6 py-4">{stats.total_dags}</td>
  //             </tr>

  //             <tr className="border-t">
  //               <td className="px-6 py-4">Total Runs</td>
  //               <td className="px-6 py-4">{stats.total_runs}</td>
  //             </tr>

  //             <tr className="border-t">
  //               <td className="px-6 py-4">Successful Runs</td>
  //               <td className="px-6 py-4">
  //                 <Badge status="Success" />
  //                 <span className="ml-2">{stats.successful_runs}</span>
  //               </td>
  //             </tr>

  //             <tr className="border-t">
  //               <td className="px-6 py-4">Failed Runs</td>
  //               <td className="px-6 py-4">
  //                 <Badge status="Failed" />
  //                 <span className="ml-2">{stats.failed_runs}</span>
  //               </td>
  //             </tr>

  //             <tr className="border-t">
  //               <td className="px-6 py-4">Files Generated</td>
  //               <td className="px-6 py-4">{stats.files_generated}</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

          <p className="text-gray-500 mt-1">
            Welcome to AirGlow Pipeline Orchestrator
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link
            to="/app/create-dag"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Create DAG
          </Link>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow border p-6"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
            >
              {card.icon}
            </div>

            <p className="text-gray-500 mt-4">{card.title}</p>

            <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow border">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Pipeline Runs</h2>

          <Link
            to="/app/runs"
            className="text-blue-600 hover:underline text-sm"
          >
            View All
          </Link>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3">Run ID</th>
              <th className="text-left px-6 py-3">DAG</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Started</th>
            </tr>
          </thead>

          <tbody>
            {recentRuns.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No Runs Available
                </td>
              </tr>
            ) : (
              recentRuns.map((run) => (
                <tr key={run.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{run.id}</td>

                  <td className="px-6 py-4">{run.dag_name}</td>

                  <td className="px-6 py-4">
                    <Badge status={run.status} />
                  </td>

                  <td className="px-6 py-4">
                    {new Date(run.start_time).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow border">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Recent DAG Runs</h2>

          <Link to="/app/runs" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        {recentRuns.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No Runs Found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Run ID</th>
                <th>DAG</th>
                <th>Status</th>
                <th>Started</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {recentRuns.map((run) => (
                <tr key={run.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{run.id}</td>

                  <td>{run.dag_name}</td>

                  <td>
                    <Badge status={run.status} />
                  </td>

                  <td>{run.start_time}</td>

                  <td>
                    <Link
                      to={`/app/runs/${run.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Remaining sections go here */}
    </div>
  );
}
