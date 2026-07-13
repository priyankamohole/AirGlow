import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen sticky top-0">
      <h2 className="text-2xl font-bold p-6">AirGlow</h2>

      <ul>
        <li>
          <Link to="/dashboard" className="block p-4 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/dags" className="block p-4 hover:bg-gray-700">
            Pipelines
          </Link>
        </li>

        <li>
          <Link to="/dags" className="block p-4 hover:bg-gray-700">
            DAGs
          </Link>
        </li>

        <li>
          <Link to="/runs" className="block p-4 hover:bg-gray-700">
            Runs
          </Link>
        </li>

        <li>
          <Link to="/outputs" className="block p-4 hover:bg-gray-700">
            Outputs
          </Link>
        </li>

        <li>
          <Link to="/webhooks" className="block p-4 hover:bg-gray-700">
            Webhooks
          </Link>
        </li>
      </ul>
    </div>
  );
}
