import { useEffect, useState } from "react";
import StatsCard from "../components/Dashboard/StatsCard";
import RecentRuns from "../components/Dashboard/RecentRuns";
import RecentDags from "../components/Dashboard/RecentDags";
import QuickActions from "../components/Dashboard/QuickAction";
import RunsChart from "../components/Dashboard/RunsChart";
import StatusPieChart from "../components/Dashboard/StatusPieChart";
// import { getDashboard } from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDags: 12,
    totalRuns: 56,
    successRuns: 49,
    failedRuns: 7,
    outputFiles: 44,
    webhooks: 5,
  });

  const [recentRuns, setRecentRuns] = useState([
    {
      id: 1,
      dag: "Customer ETL",
      status: "Success",
      time: "10:20 AM",
      duration: "4 sec",
    },
    {
      id: 2,
      dag: "Sales Pipeline",
      status: "Failed",
      time: "09:45 AM",
      duration: "2 sec",
    },
    {
      id: 3,
      dag: "Weather Batch",
      status: "Running",
      time: "09:10 AM",
      duration: "-",
    },
  ]);

  const [recentDags, setRecentDags] = useState([
    {
      id: 1,
      name: "Customer ETL",
      type: "ETL",
    },
    {
      id: 2,
      name: "Weather Batch",
      type: "Batch",
    },
    {
      id: 3,
      name: "Sales ELT",
      type: "ELT",
    },
  ]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Later connect backend

      /*
      const res = await getDashboard();

      setStats(res.data.stats);
      setRecentRuns(res.data.recent_runs);
      setRecentDags(res.data.recent_dags);
      */

      console.log("Dashboard Loaded");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            AirGlow Dashboard
          </h1>

          <p className="text-gray-500">
            Monitor pipelines, DAG executions and system status.
          </p>
        </div>

        <QuickActions />
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total DAGs"
          value={stats.totalDags}
          color="bg-blue-500"
        />

        <StatsCard
          title="Total Runs"
          value={stats.totalRuns}
          color="bg-indigo-500"
        />

        <StatsCard
          title="Successful Runs"
          value={stats.successRuns}
          color="bg-green-500"
        />

        <StatsCard
          title="Failed Runs"
          value={stats.failedRuns}
          color="bg-red-500"
        />

        <StatsCard
          title="Output Files"
          value={stats.outputFiles}
          color="bg-yellow-500"
        />

        <StatsCard
          title="Webhooks"
          value={stats.webhooks}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">
        <RunsChart />

        <StatusPieChart />
      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentRuns runs={recentRuns} />

        <RecentDags dags={recentDags} />
      </div>
    </div>
  );
}
