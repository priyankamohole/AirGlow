import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Clock, Calendar } from "lucide-react";

export default function Schedule() {
  const [dags, setDags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/dags/");
      setDags(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Schedules...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Schedule</h1>

        <p className="text-gray-500">View all scheduled DAGs</p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="p-4">DAG</th>
              <th>Schedule Type</th>
              <th>Cron Expression</th>
              <th>Next Execution</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dags.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-500">
                  No Scheduled DAGs
                </td>
              </tr>
            ) : (
              dags.map((dag) => (
                <tr key={dag.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{dag.dag_name}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      {dag.scheduler_type === "manual" ? (
                        <>
                          <Clock size={16} />
                          Manual
                        </>
                      ) : (
                        <>
                          <Calendar size={16} />
                          Cron
                        </>
                      )}
                    </div>
                  </td>

                  <td>
                    {dag.scheduler_type === "manual"
                      ? "--"
                      : dag.cron_expression}
                  </td>

                  <td>
                    {dag.scheduler_type === "manual"
                      ? "--"
                      : "Calculated by Celery Beat"}
                  </td>

                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
