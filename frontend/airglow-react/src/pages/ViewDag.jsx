import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewDag() {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [dag, setDag] = useState(null);

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

      setDag(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dag) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">{dag.pipeline_name}</h1>

        <div className="space-y-4">
          <p>
            <b>ID:</b> {dag.id}
          </p>

          <p>
            <b>Pipeline Type:</b> {dag.pipeline_type}
          </p>

          <p>
            <b>Source Type:</b> {dag.source_type}
          </p>

          <p>
            <b>Scheduler:</b> {dag.scheduler_type}
          </p>

          <p>
            <b>Cron:</b> {dag.cron_expression || "-"}
          </p>

          <p>
            <b>Created:</b> {new Date(dag.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
