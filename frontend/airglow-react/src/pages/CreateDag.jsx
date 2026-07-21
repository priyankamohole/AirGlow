import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost/dags";

export default function CreateDag() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dag_name: "",
    dag_type: "ETL",
    scheduler_type: "manual",
    cron_expression: "",

    source_config: {
      type: "api",
      url: "",
      method: "GET",
      headers: {},
    },

    transform_config: [],

    destination_config: {
      type: "postgres",
      table: "",
      file_path: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSourceChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      source_config: {
        ...prev.source_config,
        [name]: value,
      },
    }));
  };

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      destination_config: {
        ...prev.destination_config,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        transform_config: [
          {
            type: "remove_duplicates",
          },
        ],
      };

      console.log("Sending:", payload);

      await axios.post(API, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("DAG Created Successfully");

      navigate("/app/dags");
      // }
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log("Error:", error);

      alert(
        error.response?.data?.detail || error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold">Create New DAG</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* DAG Name */}

          <div>
            <label className="block mb-2 font-medium">DAG Name</label>

            <input
              name="dag_name"
              value={formData.dag_name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Pipeline Type */}

          <div>
            <label className="block mb-2 font-medium">Pipeline Type</label>
            <select
              name="dag_type"
              value={formData.dag_type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="ETL">ETL</option>
              <option value="ELT">ELT</option>
              <option value="Batch">Batch</option>
            </select>
          </div>

          {/* Source Type */}

          <div>
            <label className="block mb-2 font-medium">Source Type</label>
            <select
              name="type"
              value={formData.source_config.type}
              onChange={handleSourceChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="api">API</option>
              <option value="csv">CSV</option>
              <option value="db">Database</option>
            </select>
          </div>

          {/* API URL */}

          <div>
            <label className="block mb-2 font-medium">API URL</label>
            <input
              name="url"
              value={formData.source_config.url}
              onChange={handleSourceChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* HTTP Method */}

          <div>
            <label className="block mb-2 font-medium">Method</label>
            <select
              name="method"
              value={formData.source_config.method}
              onChange={handleSourceChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          {/* Scheduler */}

          <div>
            <label className="block mb-2 font-medium">Scheduler</label>
            <select
              name="scheduler_type"
              value={formData.scheduler_type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="manual">Manual</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {formData.scheduler_type === "auto" && (
            <div>
              <label className="block mb-2 font-medium">Cron Expression</label>

              <input
                type="text"
                name="cron_expression"
                placeholder="0 * * * *"
                value={formData.cron_expression}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          )}

          {/* Transform */}

          <div>
            <label className="block mb-2 font-medium">Transform Steps</label>

            <div className="space-y-2">
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        transform_config: [
                          ...prev.transform_config,
                          {
                            type: "remove_duplicates",
                          },
                        ],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        transform_config: prev.transform_config.filter(
                          (item) => item.type !== "remove_duplicates",
                        ),
                      }));
                    }
                  }}
                />
                Remove Duplicates
              </label>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        transform_config: [
                          ...prev.transform_config,
                          {
                            type: "filter_null_values",
                          },
                        ],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        transform_config: prev.transform_config.filter(
                          (item) => item.type !== "filter_null_values",
                        ),
                      }));
                    }
                  }}
                />
                Filter Null Values
              </label>
            </div>
          </div>
          {/* Destination */}

          <div>
            <label className="block mb-2 font-medium">Destination</label>

            <select
              value={formData.destination_config.type}
              onChange={handleDestinationChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="postgres">PostgreSQL</option>

              <option value="csv">CSV</option>

              <option value="json">JSON</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/app/dags")}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create DAG"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
