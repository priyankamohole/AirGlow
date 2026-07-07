import { useState } from "react";

export default function DagForm({
  initialData = {},
  onSubmit,
  submitText = "Save",
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    source: initialData.source || "",
    destination: initialData.destination || "",
    schedule: initialData.schedule || "",
    pipeline_type: initialData.pipeline_type || "ETL",
    status: initialData.status || "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await onSubmit(form);

    setLoading(false);
  };

  const handleReset = () => {
    setForm({
      name: "",
      description: "",
      source: "",
      destination: "",
      schedule: "",
      pipeline_type: "ETL",
      status: "Active",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      {/* Name */}

      <div>
        <label className="block font-semibold mb-2">Pipeline Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      {/* Description */}

      <div>
        <label className="block font-semibold mb-2">Description</label>

        <textarea
          rows="3"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Source */}

      <div>
        <label className="block font-semibold mb-2">Source</label>

        <input
          type="text"
          name="source"
          value={form.source}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Destination */}

      <div>
        <label className="block font-semibold mb-2">Destination</label>

        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Schedule */}

      <div>
        <label className="block font-semibold mb-2">Cron Schedule</label>

        <input
          type="text"
          name="schedule"
          placeholder="0 * * * *"
          value={form.schedule}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Pipeline Type */}

      <div>
        <label className="block font-semibold mb-2">Pipeline Type</label>

        <select
          name="pipeline_type"
          value={form.pipeline_type}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>ETL</option>
          <option>ELT</option>
          <option>Batch</option>
        </select>
      </div>

      {/* Status */}

      <div>
        <label className="block font-semibold mb-2">Status</label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Active</option>
          <option>Paused</option>
        </select>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-5 py-3 rounded-lg bg-gray-300"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}
