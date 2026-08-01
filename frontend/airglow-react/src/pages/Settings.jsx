import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, []);

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="bg-white rounded-xl shadow border p-6 max-w-2xl">
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Username</label>

          <input
            value={user.username}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Email</label>

          <input
            value={user.email}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Authentication</label>

          <input
            value="JWT Authentication"
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <button
          disabled
          className="bg-blue-600 text-white px-6 py-3 rounded-lg opacity-50 cursor-not-allowed"
        >
          Save Changes (Backend Not Available)
        </button>
      </div>
    </div>
  );
}
