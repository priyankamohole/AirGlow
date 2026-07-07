import { useNavigate } from "react-router-dom";
import DagForm from "../components/DAG/DagForm";
import dagService from "../services/dagService";

export default function CreateDag() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await dagService.createDag(data);

      alert("Pipeline Created Successfully");

      navigate("/pipelines");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.detail || "Unable to create pipeline.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Pipeline</h1>

        <p className="text-gray-500">Configure a new ETL / ELT workflow.</p>
      </div>

      <DagForm onSubmit={handleCreate} submitText="Create Pipeline" />
    </div>
  );
}
