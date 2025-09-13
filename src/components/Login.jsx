import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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
      dispatch(addUser(res?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="card bg-neutral bg-opacity-90 backdrop-blur-xl w-96 shadow-2xl relative z-10">
        <div className="card-body">
          <h3 className="text-lg text-center text-gray-200 mb-4">
            {isLoginForm ? "Login to Continue" : "Create an Account"}
          </h3>

          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs my-3">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs my-1"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs my-3">
                <div className="label">
                  <span className="label-text text-white">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs my-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs my-3">
            <div className="label">
              <span className="label-text text-white">Email</span>
            </div>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full max-w-xs my-1"
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs my-3">
            <div className="label">
              <span className="label-text text-white">Password</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs my-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-red-400 text-center">{error}</p>

          <div className="card-actions justify-center my-5">
            <button
              className="btn bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold hover:opacity-90 shadow-lg"
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={loading}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer text-sm text-gray-300 hover:text-white"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New User? Sign Up" : "Existing User? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
