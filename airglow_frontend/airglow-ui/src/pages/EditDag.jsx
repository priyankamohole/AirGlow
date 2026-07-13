import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DagForm from "../components/DAG/DagForm";
import dagService from "../services/dagService";

export default function EditDag() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dag, setDag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDag();
  }, []);

  const loadDag = async () => {
    try {
      const res = await dagService.getDag(id);
      setDag(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load pipeline");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await dagService.updateDag(id, data);

      alert("Pipeline Updated Successfully");

      navigate("/dags");
    } catch (err) {
      console.error(err);
      alert("Unable to update pipeline");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Pipeline</h1>

        <p className="text-gray-500">Update pipeline configuration.</p>
      </div>

      <DagForm
        initialData={dag}
        onSubmit={handleUpdate}
        submitText="Update Pipeline"
      />
    </div>
  );
}
