export default function RecentRuns({ runs }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent Runs</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">DAG</th>
            <th>Status</th>
            <th>Time</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{run.dag}</td>

              <td className="text-center">
                {run.status === "Success" && (
                  <span className="text-green-600 font-semibold">
                    ✅ Success
                  </span>
                )}

                {run.status === "Failed" && (
                  <span className="text-red-600 font-semibold">❌ Failed</span>
                )}

                {run.status === "Running" && (
                  <span className="text-yellow-600 font-semibold">
                    🟡 Running
                  </span>
                )}
              </td>

              <td className="text-center">{run.time}</td>

              <td className="text-center">{run.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
