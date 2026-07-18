import { Link } from "react-router-dom";
import Badge from "../components/Badge";

const stats = [
  {
    title: "Total DAGs",
    value: "24",
    change: "+3 this week",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Successful Runs",
    value: "152",
    change: "+18 this week",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Failed Runs",
    value: "6",
    change: "-2 this week",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Total Records",
    value: "15.6K",
    change: "+2.4K this week",
    color: "bg-yellow-100 text-yellow-600",
  },
];

const recentRuns = [
  {
    id: 909,
    dag: "Daily Users Pipeline",
    status: "Success",
    start: "May 18, 10:30 AM",
    duration: "12.3s",
    records: 1245,
  },
  {
    id: 908,
    dag: "Orders ETL",
    status: "Success",
    start: "May 18, 09:15 AM",
    duration: "18.7s",
    records: 2341,
  },
  {
    id: 907,
    dag: "Products Pipeline",
    status: "Failed",
    start: "May 18, 08:20 AM",
    duration: "--",
    records: 0,
  },
  {
    id: 906,
    dag: "Inventory Sync",
    status: "Success",
    start: "May 17, 11:45 PM",
    duration: "9.2s",
    records: 632,
  },
];

const health = [
  "API Gateway",
  "Database",
  "Redis",
  "Celery Workers",
  "Celery Beat",
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Monitor your AirGlow pipelines</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-white shadow-sm p-6 border"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}
            >
              📊
            </div>

            <p className="mt-4 text-gray-500">{item.title}</p>

            <h2 className="text-4xl font-bold mt-2">{item.value}</h2>

            <p className="text-green-600 mt-2 text-sm">{item.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Runs Overview</h2>

            <div className="flex gap-6 text-sm">
              <span className="text-green-600">● Successful</span>
              <span className="text-red-500">● Failed</span>
            </div>
          </div>

          <svg viewBox="0 0 640 220" className="w-full h-64">
            <line x1="30" y1="10" x2="30" y2="180" stroke="#ddd" />
            <line x1="30" y1="180" x2="630" y2="180" stroke="#ddd" />

            <polyline
              fill="none"
              stroke="#16a34a"
              strokeWidth="3"
              points="30,110 130,140 230,95 330,120 430,70 530,90 620,60"
            />

            <polyline
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              points="30,168 130,158 230,170 330,150 430,163 530,155 620,165"
            />
          </svg>
        </div>

        {/* Pie */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-5">Runs By Status</h2>

          <div className="flex flex-col items-center">
            <svg width="180" height="180" viewBox="0 0 42 42">
              <circle
                cx="21"
                cy="21"
                r="15.9"
                fill="transparent"
                stroke="#E5E7EB"
                strokeWidth="4"
              />

              <circle
                cx="21"
                cy="21"
                r="15.9"
                fill="transparent"
                stroke="#16A34A"
                strokeWidth="4"
                strokeDasharray="92 100"
                strokeDashoffset="25"
              />

              <circle
                cx="21"
                cy="21"
                r="15.9"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="4"
                strokeDasharray="4 100"
                strokeDashoffset="-67"
              />

              <circle
                cx="21"
                cy="21"
                r="15.9"
                fill="transparent"
                stroke="#94A3B8"
                strokeWidth="4"
                strokeDasharray="4 100"
                strokeDashoffset="-71"
              />
            </svg>

            <div className="mt-6 space-y-3 text-sm">
              <p className="text-green-600">● Success (92%)</p>

              <p className="text-red-500">● Failed (4%)</p>

              <p className="text-gray-500">● Running (4%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Runs</h2>

            <Link to="/app/runs" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Run ID</th>
                  <th className="px-6 py-4 text-left">DAG</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Start</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Records</th>
                </tr>
              </thead>

              <tbody>
                {recentRuns.map((run) => (
                  <tr key={run.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{run.id}</td>

                    <td className="px-6 py-4">{run.dag}</td>

                    <td className="px-6 py-4">
                      <Badge status={run.status} />
                    </td>

                    <td className="px-6 py-4">{run.start}</td>

                    <td className="px-6 py-4">{run.duration}</td>

                    <td className="px-6 py-4">{run.records}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Health */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-5">System Health</h2>

          <div className="space-y-5">
            {health.map((item) => (
              <div key={item} className="flex justify-between items-center">
                <span className="font-medium">{item}</span>

                <span className="flex items-center gap-2 text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Healthy
                </span>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
