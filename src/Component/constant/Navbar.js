import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Logout } from "../../Redux/Features/Auth/auth";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handlelogout = async () => {
    try {
      dispatch(Logout());
      Cookies.remove("isLoggedIn");
      Cookies.remove("avatar");
      alert("Successfully Logout");
      navigate("/login");
    } catch (error) {
      console.log("Try Again!!", error);
    }
  };

  const handlenavigatevideouploadcom=()=>{
    navigate("/video/publish-video");
  }
  const Avatar = Cookies.get("avatar");

  return (
    <>
      <div className="mb-24">
        <nav className="fixed top-0 right-0 left-0 bg-red-700 flex justify-between px-4 py-4 md:px-4 items-center">
          <div className="text-white ml-12 font-bold text-2xl">
            <Link to="/" className="ml-14 md:ml-0">
              VideoTube
            </Link>
          </div>
          <ul className="md:flex font-semibold hidden text-white">
            <li className="mx-2">
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li className="mx-2">
              <Link to="/community" className="">
                Community
              </Link>
            </li>
          </ul>
          <ul className="flex">
            <div className="px-2 pt-2 text-white cursor-pointer" onClick={handlenavigatevideouploadcom}>
              <span className="mx-2 material-icons" style={{fontSize:"2.2rem"}}>
                video_call
              </span>
            </div>
            <div className="relative">
              {!Cookies.get("isLoggedIn") ? (
                <Link
                  to="/login"
                  style={{ fontSize: "2rem" }}
                  className="material-icons mr-5 font-semibold p-2 text-white rounded-full"
                >
                  account_circle
                </Link>
              ) : (
                <>
                  {Avatar ? (
                    <img
                      src={Cookies.get("avatar")}
                      alt="avatar"
                      className=" w-12 h-12 mr-5 font-semibold cursor-pointer text-white rounded-full border-2"
                      onClick={toggleDropdown}
                      style={{ fontSize: "2rem" }}
                    />
                  ) : (
                    <span className="material-icons">account_circle</span>
                  )}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg">
                      <Link
                        to="/current-user"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/setting"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handlelogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
