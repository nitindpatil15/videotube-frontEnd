import React, { useState } from "react";
import { Link } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";

const Verticlenav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed">
      <div className="mx-1 md:mx-3">
        <ul className="flex flex-col items-center mt-[-80px] md:w-32 ">
          <div className="mb-2 md:ml-[-5rem]  mt-1 hover:bg-slate-800 hover:rounded-lg">
            <span className="text-white py-6 px-2" onClick={toggleDropdown}>
              <span className="material-icons py-2 cursor-pointer">menu</span>
            </span>
          </div>
          {dropdownOpen && (
            <li className="md:hidden h-screen bg-black ml-[-0.3rem] p-4 text-white text-3xl mt-3">
              <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
                <Link to="/" className="text-white p-8">
                  <span className="material-icons">home</span>
                </Link>
                <p className="text-base text-center">Home</p>
              </div>
              <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
                <Link to="/community" className="text-white p-8">
                  <span className="material-icons">note_alt</span>
                </Link>
                <p className="text-base text-center">Community</p>
              </div>
              <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
                <Link to="/subscribed-channel" className="text-white p-8">
                  <span className="material-icons">subscriptions</span>
                </Link>
                <p className="text-base text-center">Subscription</p>
              </div>
              <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
                <Link to="/current-user" className="text-white p-8">
                  <span className="material-icons">account_circle</span>
                </Link>
                <p className="text-base text-center">You</p>
              </div>
            </li>
          )}
          {dropdownOpen &&(<li className="py-2 px-4 ml-2 hidden md:block h-screen bg-black text-white text-3xl mt-3">
            <Link
              to="/"
              className=" hover:bg-slate-800 hover:rounded-lg flex flex-row items-center cursor-pointer"
            >
              <div className="text-white p-4">
                <span className="material-icons">home</span>
              </div>
              <p className="text-base text-center p-2">Home</p>
            </Link>
            <Link
              to="/community"
              className=" hover:bg-slate-800 hover:rounded-lg flex flex-row items-center"
            >
              <div className="text-white p-4">
                <span className="material-icons">note_alt</span>
              </div>
              <p className="text-base text-center p-2">Community</p>
            </Link>
            <Link
              to="/subscribed-channel"
              className=" hover:bg-slate-800 hover:rounded-lg flex flex-row items-center"
            >
              <div className="text-white p-4">
                <span className="material-icons">subscriptions</span>
              </div>
              <p className="text-base text-center p-2">Subscription</p>
            </Link>
            <Link
              to="/current-user"
              className=" hover:bg-slate-800 hover:rounded-lg flex flex-row items-center"
            >
              <div className="text-white p-4">
                <span className="material-icons">account_circle</span>
              </div>
              <p className="text-base text-center p-2">You</p>
            </Link>
          </li>)}
        </ul>
      </div>
    </div>
  );
};

export default Verticlenav;
