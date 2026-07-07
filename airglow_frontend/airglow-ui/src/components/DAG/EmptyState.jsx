import { FaDatabase } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow text-center p-16">
      <FaDatabase className="mx-auto text-gray-400" size={60} />

      <h2 className="text-2xl font-bold mt-5">No Pipelines Found</h2>

      <p className="text-gray-500 mt-2">
        Create your first pipeline to get started.
      </p>
    </div>
  );
}
