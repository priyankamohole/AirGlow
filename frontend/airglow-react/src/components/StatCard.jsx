import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  icon,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>

          <div
            className={`flex items-center mt-3 text-sm font-medium ${
              positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}

            <span className="ml-1">{change}</span>
          </div>
        </div>

        <div className="bg-blue-100 text-blue-700 rounded-xl p-3">{icon}</div>
      </div>
    </div>
  );
}
