import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle change data from the input field:
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle submit and fetch data from the api:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign In</h1>
      {/* Sign Up Form Start Here */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      {/* Sign Up Form End Here */}
      <div className="flex items-center gap-2 mt-5">
        <p className="text-gray-500"> Dont Have an Account?</p>
        <Link
          to={"/sign-up"}
          className="text-blue-800 underline font-[500] hover:text-red-700 transition-all duration-150"
        >
          Sign Up
        </Link>
      </div>
      <p className="text-red-600 font-semibold mt-5">
        {error ? error.message || "something went wrong!" : ""}
      </p>
    </div>
  );
};

export default SignIn;
