import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatusPieChart() {
  const data = {
    labels: ["Success", "Failed"],

    datasets: [
      {
        data: [45, 5],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Execution Status</h2>

      <Pie data={data} />
    </div>
  );
}
