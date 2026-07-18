import Badge from "./Badge";

export default function Table({ columns, data }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-6 py-4 text-gray-600 font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-4">{row.id}</td>

              <td className="px-6 py-4">{row.pipeline}</td>

              <td className="px-6 py-4">
                <Badge status={row.status} />
              </td>

              <td className="px-6 py-4">{row.start}</td>

              <td className="px-6 py-4">{row.duration}</td>

              <td className="px-6 py-4">{row.records}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
