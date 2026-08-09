
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/login", {
        email: email,
        password: password,
      });

      console.log("Login response:", response.data);

      // Store login state
      localStorage.setItem("isLoggedIn", "true");

localStorage.setItem("token", response.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

      // Go to dashboard
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-900 via-violet-700 to-indigo-900 p-16 flex-col justify-center text-white">

        <h1 className="text-5xl font-bold mb-6">
          Intelligent Document Management System
        </h1>

        <p className="text-xl opacity-90 mb-10">
          Securely upload, organize, search and manage documents
          with OCR powered intelligence.
        </p>

        <div className="space-y-5">

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5">
            📄 Smart Document Upload
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5">
            🔍 OCR Text Extraction
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5">
            📊 Analytics Dashboard
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5">
            🔐 Secure Authentication
          </div>

        </div>

      </div>


      {/* Right Section */}

      <div className="flex-1 flex items-center justify-center bg-[#09090B]">

        <div className="w-[430px] bg-[#18181B] rounded-3xl p-10 border border-zinc-700 shadow-2xl">

          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-zinc-400 mb-8">
            Login to continue
          </p>


          {/* Login Form */}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="mb-5">

              <label className="text-zinc-300 text-sm">
                Email
              </label>

              <div className="flex items-center mt-2 bg-zinc-900 rounded-xl px-4 h-14">

                <FaEnvelope className="text-purple-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="bg-transparent outline-none flex-1 ml-3 text-white"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label className="text-zinc-300 text-sm">
                Password
              </label>

              <div className="flex items-center mt-2 bg-zinc-900 rounded-xl px-4 h-14">

                <FaLock className="text-purple-500" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="bg-transparent outline-none flex-1 ml-3 text-white"
                />

              </div>

            </div>


            {/* Error */}

            {error && (
              <p className="text-red-400 text-sm mt-4">
                {error}
              </p>
            )}


            {/* Remember Me */}

            <div className="flex justify-between mt-5 text-sm">

              <label className="text-zinc-400">

                <input
                  type="checkbox"
                  className="mr-2"
                />

                Remember Me

              </label>

              <span className="text-purple-400 cursor-pointer">
                Forgot Password?
              </span>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 h-14 rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white font-semibold hover:scale-105 duration-300 disabled:opacity-50"
            >

              {loading ? "Logging in..." : "Login"}

            </button>

          </form>


          <p className="text-center text-zinc-400 mt-8">

            Don't have an account?

            <span className="text-purple-400 cursor-pointer ml-2">
              Register
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;

