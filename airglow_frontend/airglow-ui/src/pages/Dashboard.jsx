import { useEffect, useState } from "react";
import StatsCard from "../components/Dashboard/StatsCard";
import RecentRuns from "../components/Dashboard/RecentRuns";
import RecentDags from "../components/Dashboard/RecentDags";
import QuickActions from "../components/Dashboard/QuickAction";
import RunsChart from "../components/Dashboard/RunsChart";
import StatusPieChart from "../components/Dashboard/StatusPieChart";
import Loader from "../components/Loader";
import { getDashboardStats, getRecentRuns, getRecentDags } from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_dags: 0,
    total_runs: 0,
    successful_runs: 0,
    failed_runs: 0,
    files_generated: 0,
  });

  const [recentRuns, setRecentRuns] = useState([]);
  const [recentDags, setRecentDags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, runsRes, dagsRes] = await Promise.all([
        getDashboardStats(),
        getRecentRuns(),
        getRecentDags(),
      ]);

      setStats(statsRes.data);
      // Show only the 5 most recent runs/dags
      setRecentRuns((runsRes.data || []).slice(0, 5));
      setRecentDags((dagsRes.data || []).slice(0, 5));
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Dashboard..." />;

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
          value={stats.total_dags}
          color="bg-blue-500"
        />

        <StatsCard
          title="Total Runs"
          value={stats.total_runs}
          color="bg-indigo-500"
        />

        <StatsCard
          title="Successful Runs"
          value={stats.successful_runs}
          color="bg-green-500"
        />

        <StatsCard
          title="Failed Runs"
          value={stats.failed_runs}
          color="bg-red-500"
        />

        <StatsCard
          title="Output Files"
          value={stats.files_generated}
          color="bg-yellow-500"
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

