import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-300">
      <div className="max-w-6xl mx-auto p-3 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-slate-900 text-xl md:text-2xl font-bold">
            Auth <span className="text-red-800">App</span>
          </h1>
        </Link>

        <ul className="flex items-center gap-4">
          <Link
            to={"/"}
            className="font-[500] hover:underline hover:text-slate-800 transition-all duration-150"
          >
            <li>Home</li>
          </Link>
          <Link
            to={"/about"}
            className="font-[500] hover:underline hover:text-slate-800 transition-all duration-150"
          >
            <li>About</li>
          </Link>
          <Link
            to={"/sign-in"}
            className="font-[500] hover:underline hover:text-slate-800 transition-all duration-150"
          >
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
