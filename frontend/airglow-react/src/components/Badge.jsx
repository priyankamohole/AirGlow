export default function Badge({ status }) {
  const styles = {
    success: "bg-green-100 text-green-700",

    failed: "bg-red-100 text-red-700",

    running: "bg-blue-100 text-blue-700",

    pending: "bg-yellow-100 text-yellow-700",

    queued: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
