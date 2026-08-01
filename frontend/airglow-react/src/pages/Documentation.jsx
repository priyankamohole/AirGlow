import {
  BookOpen,
  Workflow,
  PlayCircle,
  CalendarDays,
  Webhook,
  Shield,
  Database,
  CheckCircle,
} from "lucide-react";

export default function Documentation() {
  const sections = [
    {
      title: "Authentication",
      icon: <Shield className="text-blue-600" size={22} />,
      items: [
        "JWT Login Authentication",
        "Google OAuth Login",
        "GitHub OAuth Login",
        "Protected API Routes",
      ],
    },
    {
      title: "DAG Management",
      icon: <Workflow className="text-green-600" size={22} />,
      items: [
        "Create DAG",
        "Edit DAG",
        "View DAG",
        "Delete DAG",
        "Run DAG Manually",
      ],
    },
    {
      title: "Pipeline Runs",
      icon: <PlayCircle className="text-purple-600" size={22} />,
      items: [
        "Execution History",
        "Run Details",
        "Execution Status",
        "Logs",
        "Metrics",
      ],
    },
    {
      title: "Scheduling",
      icon: <CalendarDays className="text-orange-600" size={22} />,
      items: [
        "Manual Execution",
        "Cron Scheduler",
        "Celery Worker",
        "Redis Queue",
      ],
    },
    {
      title: "Webhooks",
      icon: <Webhook className="text-pink-600" size={22} />,
      items: [
        "Webhook Registration",
        "POST Callback",
        "Execution Notifications",
      ],
    },
    {
      title: "Database",
      icon: <Database className="text-cyan-600" size={22} />,
      items: [
        "PostgreSQL (Supabase)",
        "Pipeline Metadata",
        "Run History",
        "Execution Logs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}

      <div className="mb-8 flex items-center gap-3">
        <BookOpen size={34} className="text-blue-600" />

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            AirGlow Documentation
          </h1>

          <p className="text-gray-500">
            Backend services and platform features
          </p>
        </div>
      </div>

      {/* Overview */}

      <div className="rounded-xl bg-white border shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Platform Overview</h2>

        <p className="text-gray-600 leading-7">
          AirGlow is an ETL/ELT workflow orchestration platform built using
          FastAPI, Celery, Redis and PostgreSQL. Users can authenticate, create
          DAGs, schedule workflows, execute pipelines manually, monitor
          execution history and receive webhook notifications.
        </p>
      </div>

      {/* Features */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl border shadow p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}

              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>

            <ul className="space-y-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <CheckCircle size={16} className="text-green-500" />

                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* API Endpoints */}

      <div className="mt-8 rounded-xl bg-white border shadow">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">Available Backend APIs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4">Service</th>
                <th className="text-left p-4">Endpoint</th>
                <th className="text-left p-4">Purpose</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4 font-medium">Authentication</td>
                <td className="p-4 font-mono">/auth/*</td>
                <td className="p-4">Login & OAuth</td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-medium">DAGs</td>
                <td className="p-4 font-mono">/dags</td>
                <td className="p-4">CRUD Operations</td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-medium">Run DAG</td>
                <td className="p-4 font-mono">/dags/:id/run</td>
                <td className="p-4">Execute Pipeline</td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-medium">Runs</td>
                <td className="p-4 font-mono">/runs</td>
                <td className="p-4">Execution History</td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-medium">Schedules</td>
                <td className="p-4 font-mono">/schedule</td>
                <td className="p-4">Cron Scheduling</td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-medium">Webhooks</td>
                <td className="p-4 font-mono">/webhooks</td>
                <td className="p-4">Notifications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
