export default function RecentDags({ dags }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent DAGs</h2>

      {dags.map((dag) => (
        <div key={dag.id} className="flex justify-between border-b py-3">
          <div>
            <h3 className="font-semibold">{dag.name}</h3>
          </div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {dag.type}
          </span>
        </div>
      ))}
    </div>
  );
}
