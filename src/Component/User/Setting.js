import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Setting = () => {
    const navigate = useNavigate()
    const handlelogout = () => {
        const response = axios.post(
          "http://localhost:7500/api/v1/users/logout",
          {},
          { withCredentials: true }
        );
        if (!response) {
          console.log("Try Again!!");
        }
        Cookies.remove("isLoggedIn")
        Cookies.remove('avatar');
        alert("Successfully Logout");
        navigate("/login");
      };
  return (
    <>
      <div className="container text-white md:ml-52">
        <div className="flex flex-col md:w-[70rem] h-[32rem]">
          <h1 className="text-gray-500 text-6xl my-8 mx-2">Settings</h1>
          <Link to='/edit-detail' className="border-b-2 m-4 bg-slate-800 hover:bg-white rounded-lg hover:text-black px-8 py-3 cursor-pointer text-3xl">
            Edit Profile Details
          </Link>
          <Link to='/reset-pass' className="border-b-2 m-4 bg-slate-800 hover:bg-white rounded-lg hover:text-black px-8 py-3 cursor-pointer text-3xl">
            Reset Password
          </Link>
          <div className="border-b-2 m-4 bg-slate-800 hover:bg-white rounded-lg hover:text-black px-8 py-3 cursor-pointer text-3xl" onClick={handlelogout}>LogOut</div>
        </div>
      </div>
    </>
  );
};

export default Setting;
