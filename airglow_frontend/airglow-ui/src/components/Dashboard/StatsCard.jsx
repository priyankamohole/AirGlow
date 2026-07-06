export default function StatsCard({ title, value, color }) {
  return (
    <div
      className={`rounded-xl shadow-lg text-white p-6 ${color} transition transform hover:scale-105`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-4xl font-bold mt-4">{value}</p>
    </div>
  );
}
