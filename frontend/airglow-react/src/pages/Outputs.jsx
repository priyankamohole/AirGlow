import { useEffect, useState } from "react";
import api from "../utils/axios";
import { FileText, Download, Calendar, Database } from "lucide-react";

export default function Outputs() {
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOutputs();
  }, []);

  const fetchOutputs = async () => {
    try {
      // Replace with your backend endpoint when available
      const res = await api.get("/outputs");
      setOutputs(res.data);
    } catch (err) {
      console.log(err);

      // Temporary until backend exists
      setOutputs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Outputs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}

      <div className="mb-8 flex items-center gap-3">
        <FileText className="text-blue-600" size={32} />

        <div>
          <h1 className="text-3xl font-bold">Pipeline Outputs</h1>

          <p className="text-gray-500">Generated files after DAG execution</p>
        </div>
      </div>

      {outputs.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow">
          <FileText size={60} className="mx-auto mb-4 text-gray-300" />

          <h2 className="text-xl font-semibold">No Outputs Available</h2>

          <p className="mt-2 text-gray-500">
            Run a DAG to generate output files.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Output</th>
                <th className="p-4 text-left">DAG</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Generated</th>
                <th className="p-4 text-center">Download</th>
              </tr>
            </thead>

            <tbody>
              {outputs.map((output) => (
                <tr key={output.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-2">
                    <FileText size={18} />

                    {output.file_name}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Database size={16} />
                      {output.dag_name}
                    </div>
                  </td>

                  <td className="p-4">{output.file_type}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />

                      {output.created_at}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <button className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
