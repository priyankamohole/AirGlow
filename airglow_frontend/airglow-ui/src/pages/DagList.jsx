import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSyncAlt } from "react-icons/fa";

import useDags from "../hooks/useDags";
import DagTable from "../components/DAG/DagTable";
import DagFilters from "../components/DAG/DagFilters";
import EmptyState from "../components/DAG/EmptyState";
import Loader from "../components/Dashboard/Loader";

export default function DagList() {
  const navigate = useNavigate();

  const { dags, loading, error, fetchDags, deleteDag } = useDags();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = dags.filter((dag) => {
    const matchesSearch = dag.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "" || dag.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pipeline?")) return;

    await deleteDag(id);
  };

  if (loading) return <Loader text="Loading Pipelines..." />;

  if (error) return <div className="text-red-600 font-semibold">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pipelines</h1>

          <p className="text-gray-500">Manage ETL / ELT workflows</p>
        </div>

        <button
          onClick={() => navigate("/pipelines/create")}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          <FaPlus className="inline mr-2" />
          Create Pipeline
        </button>
      </div>

      <div className="flex justify-between items-center mb-5">
        <DagFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        <button
          onClick={fetchDags}
          className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300"
        >
          <FaSyncAlt />
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <DagTable dags={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
