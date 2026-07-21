import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../utils/axios";

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      const res = await api.get("/webhooks");
      setWebhooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWebhook = async (id) => {
    if (!window.confirm("Delete this webhook?")) return;

    try {
      await api.delete(`/webhooks/${id}`);
      fetchWebhooks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Webhooks</h1>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
          <Plus size={18} />
          Add Webhook
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-4">ID</th>

              <th className="px-6 py-4">DAG Name</th>

              <th className="px-6 py-4">Callback URL</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {webhooks.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{item.id}</td>

                <td className="px-6 py-4 font-medium">{item.dag_name}</td>

                <td className="px-6 py-4 text-gray-600">{item.callback_url}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteWebhook(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 text-sm text-gray-500">
          Showing 1 to {webhooks.length} of {webhooks.length} results
        </div>
      </div>
    </div>
  );
}
