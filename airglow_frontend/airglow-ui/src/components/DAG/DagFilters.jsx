import { FaSearch } from "react-icons/fa";

export default function DagFilters({ search, setSearch, status, setStatus }) {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="relative">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search pipeline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg pl-10 pr-4 py-2 w-72"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All</option>
        <option>Active</option>
        <option>Paused</option>
      </select>
    </div>
  );
}
