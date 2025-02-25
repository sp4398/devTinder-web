import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("hardik@gmail.com");
  const [password, setPassword] = useState("Hardik@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-15 ">
      <div className="card bg-neutral w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">Login</h2>
          <label className="form-control w-full max-w-xs my-5">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full max-w-xs my-1"
              onChange={(e) => setEmailId(e.target.value)}
              required
              aria-label="Email"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs my-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
