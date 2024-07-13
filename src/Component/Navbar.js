import React from "react";
import { Link } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";

const Navbar = (props) => {
  return (
    <>
      <div className="mb-24">
        <nav className="fixed top-0 right-0 left-0 bg-black flex justify-between px-4 py-4 md:px-4 items-center">
          <div className="text-white ml-3 font-bold text-2xl">
            <Link to="/" className="ml-14 md:ml-20 bg-black">VideoTube</Link>
          </div>
          <ul className="md:flex font-semibold hidden text-white">
            <li className="mx-2 ">
              <Link to="/" className="bg-black">Home</Link>
            </li>
            <li className="mx-2 ">
              <Link to="/community" className="bg-black">Community</Link>
            </li>
          </ul>
          <li className="flex">
            <Link
              to="/login"
              className="mr-5 font-semibold p-2 bg-indigo-700 text-white rounded-full"
            >
              Login
            </Link>
          </li>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
