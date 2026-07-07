import { FaSpinner } from "react-icons/fa";

export default function Loader({ text = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      <FaSpinner className="text-blue-600 text-4xl animate-spin" />

      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
}
