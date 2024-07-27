import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // handle Change the data from input:
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle Submit and fetch the data from api:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      // create response:
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // convert response to json:
      const data = await res.json();
      console.log(data);
      // if success:
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
      {/* Sign Up Form Start Here */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          id="username"
          placeholder="UserName"
          className="bg-slate-100 p-3 rounded-lg border border-blue-300 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg border border-blue-300 focus:outline-none"
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="bg-slate-100 p-3 w-full rounded-lg border border-blue-300 focus:outline-none"
            onChange={handleChange}
          />
          {showPassword ? (
            <FaEyeSlash
              className="absolute right-4 top-4 text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="absolute right-4 top-4 text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 p-3 uppercase text-white rounded-lg hover:rounded-full  hover:bg-opacity-90 disabled:opacity-80 disabled:rounded-full transition-all duration-150"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {/* Sign Up Form End Here */}
      <div className="flex items-center gap-2 mt-5">
        <p className="text-gray-500">Have an Account?</p>
        <Link
          to={"/sign-in"}
          className="text-blue-800 underline font-[500] hover:text-red-700 transition-all duration-150"
        >
          Sign In
        </Link>
      </div>
      {error && (
        <p className="text-red-600 font-semibold mt-5">Failed to Sign Up...</p>
      )}
    </div>
  );
};

export default SignUp;
