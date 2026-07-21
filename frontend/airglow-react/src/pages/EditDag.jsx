import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditDag() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    pipeline_name: "",
    pipeline_type: "ETL",
    source_type: "api",
    scheduler_type: "manual",
    cron_expression: "",
  });

  useEffect(() => {
    fetchDag();
  }, []);

  const fetchDag = async () => {
    try {
      const res = await axios.get(`http://localhost/dags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load DAG");
    }
  };

  const updateDag = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost/dags/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("DAG Updated");
      navigate("/app/dags");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit DAG</h1>

      <form
        onSubmit={updateDag}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        <input
          className="w-full border rounded p-3"
          placeholder="Pipeline Name"
          value={form.pipeline_name}
          onChange={(e) =>
            setForm({
              ...form,
              pipeline_name: e.target.value,
            })
          }
        />

        <select
          className="w-full border rounded p-3"
          value={form.pipeline_type}
          onChange={(e) =>
            setForm({
              ...form,
              pipeline_type: e.target.value,
            })
          }
        >
          <option>ETL</option>
          <option>ELT</option>
          <option>Batch</option>
        </select>

        <select
          className="w-full border rounded p-3"
          value={form.scheduler_type}
          onChange={(e) =>
            setForm({
              ...form,
              scheduler_type: e.target.value,
            })
          }
        >
          <option value="manual">Manual</option>
          <option value="auto">Auto</option>
        </select>

        {form.scheduler_type === "auto" && (
          <input
            className="w-full border rounded p-3"
            placeholder="Cron Expression"
            value={form.cron_expression}
            onChange={(e) =>
              setForm({
                ...form,
                cron_expression: e.target.value,
              })
            }
          />
        )}

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Update DAG
        </button>
      </form>
    </div>
  );
}
