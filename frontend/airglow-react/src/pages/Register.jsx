import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { LogoIcon } from "../components/icons";
import etlIllustration from "../assets/etl.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/register", form);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-100 p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <LogoIcon size={30} />
            <h1 className="text-3xl font-bold">
              Air<span className="text-blue-600">Glow</span>
            </h1>
          </div>

          <h2 className="text-5xl font-bold mt-10">Create your account</h2>

          <p className="text-gray-500 mt-4 text-lg">
            Build, Schedule and Monitor Data Pipelines Easily.
          </p>

          <img
            src={etlIllustration}
            className="mt-12 w-full max-w-lg mx-auto"
            alt=""
          />
        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-10">
          <form onSubmit={handleRegister} className="w-full max-w-md space-y-5">
            <h2 className="text-3xl font-bold text-center">Create Account</h2>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
              {loading ? "Creating Account..." : "Register"}
            </button>

            {/* Divider */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-t w-full"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "http://localhost/auth/login/google")
                }
                className="border rounded-xl py-3 hover:bg-gray-100"
              >
                Google
              </button>

              <button
                type="button"
                onClick={() =>
                  (window.location.href = "http://localhost/auth/login/github")
                }
                className="border rounded-xl py-3 hover:bg-gray-100"
              >
                GitHub
              </button>
            </div>

            <p className="text-center text-gray-500">
              Already have an account?
              <Link to="/" className="text-blue-600 font-semibold ml-2">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
