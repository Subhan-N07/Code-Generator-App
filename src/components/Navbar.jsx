import React from "react";
import { HiSun } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <>
      <div className="nav sticky top-0 z-40 flex items-center justify-between px-6 md:px-20 lg:px-28 h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 border-b border-gray-800 shadow-sm backdrop-blur-sm">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md">
            <span className="font-mono text-sm">AI</span>
          </div>
          <div className="leading-tight">
            <h3 className="text-white text-lg font-semibold">GenUI</h3>
            <p className="text-xs text-gray-400 -mt-1">Code Generator</p>
          </div>
        </div>

        {/* Search / Prompt input (hidden on very small screens) */}
        <div className="flex-1 max-w-2xl px-6 hidden sm:block">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
              {/* small search icon (emoji keeps dependency light) */}
              🔎
            </div>
            <div
              type="text"
              placeholder="Ask GenUI to generate code — e.g. 'React modal with animation'"
              className="w-full h-11 rounded-lg bg-slate-900/40 border border-gray-800 placeholder-gray-400 text-sm text-white pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-label="Generate code"
            >
              <p className="mt-2.5 ml-10 text-gray-300">
                Ask GenUI to generate code — e.g. 'React modal with animation'
              </p>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md shadow-sm transition">
                Gen-Ai
              </button>
            </div>
          </div>
        </div>

        {/* Right icons */}
        <div className="icons flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            className="p-2 rounded-lg hover:bg-slate-800/60 text-gray-200 transition flex items-center justify-center"
            title="Toggle theme"
          >
            <HiSun className="w-5 h-5" />
          </button>

          <button
            aria-label="Account"
            className="p-2 rounded-lg hover:bg-slate-800/60 text-gray-200 transition flex items-center justify-center"
            title="Account"
          >
            <FaUser className="w-5 h-5" />
          </button>

          <button
            aria-label="Settings"
            className="p-2 rounded-lg hover:bg-slate-800/60 text-gray-200 transition flex items-center justify-center"
            title="Settings"
          >
            <RiSettings3Fill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
