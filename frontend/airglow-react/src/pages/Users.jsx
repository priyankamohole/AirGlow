import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Users() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow border p-6 max-w-xl">
        <div className="mb-5">
          <p className="text-gray-500">Username</p>
          <h2 className="text-xl font-semibold">{user.username}</h2>
        </div>

        <div className="mb-5">
          <p className="text-gray-500">Email</p>
          <h2>{user.email}</h2>
        </div>

        <div>
          <p className="text-gray-500">Account Status</p>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
