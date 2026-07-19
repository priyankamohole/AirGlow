import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../components/icons.jsx";
import etlIllustration from "../assets/etl.png";
import api from "../utils/axios";
import { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/app/dashboard");
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      api.post("/login", form).then((res) => {
        localStorage.setItem("token", res.data.access_token);

        navigate("/app/dashboard");
      });
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.detail || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-100 p-6 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <LogoIcon size={30} />
            <span className="text-2xl font-bold">AirGlow</span>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              Welcome to <span className="text-blue-600">AirGlow</span>
            </h1>

            <p className="text-gray-500 mt-3 text-base md:text-lg">
              Data Pipeline Orchestrator
            </p>
          </div>

          <div className="flex justify-center items-center mt-8">
            <img
              src={etlIllustration}
              alt="ETL"
              className="
            w-full
            max-w-[300px]
            sm:max-w-[420px]
            md:max-w-[500px]
            lg:max-w-[650px]
            xl:max-w-[700px]
            h-auto
            object-contain
          "
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-center">
              Sign in to your account
            </h2>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Email address
              </label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" className="text-blue-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Google */}
              <button
                type="button"
                onClick={() => {
                  window.location.href = "http://localhost/auth/login/google";
                }}
                className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => {
                  window.location.href = "http://localhost/auth/login/github";
                }}
                className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
