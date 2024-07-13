import React from "react";
import { Link } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";

const Verticlenav = () => {
  return (
    <div className="fixed">
      <div className="mx-1 md:mx-3">
        <ul className="flex flex-col items-center mt-[-80px]">
          <div className="mb-2 mx-4 hover:bg-slate-800 hover:rounded-lg ">
            <span className="text-white p-4">
              <span className="material-icons py-2 cursor-pointer">menu</span>
            </span>
          </div>
          <li className="hidden md:block h-screen bg-black text-white text-3xl mt-5">
            <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
              <Link to="/" className="text-white p-8">
                <span className="material-icons">home</span>
              </Link>
              <p className="text-base text-center">Home</p>
            </div>
            <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
              <Link to="/" className="text-white p-8">
                <span className="material-icons">note_alt</span>
              </Link>
              <p className="text-base text-center">Community</p>
            </div>
            <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
              <Link to="/" className="text-white p-8">
                <span className="material-icons">subscriptions</span>
              </Link>
              <p className="text-base text-center">Subscription</p>
            </div>
            <div className="my-2 hover:bg-slate-800 hover:rounded-lg p-[5px]">
              <Link to="/" className="text-white p-8">
                <span className="material-icons">account_circle</span>
              </Link>
              <p className="text-base text-center">You</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Verticlenav;
