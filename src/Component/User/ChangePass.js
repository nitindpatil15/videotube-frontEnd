import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserPass } from "../../Redux/Features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] = useState(null)
  const [oldPassword,setOldPassword] = useState(null)
  const changePass = async (e) => {
    e.preventDefault();
    dispatch(changeUserPass({ oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };
  return (
    <div className="md:ml-32 mt-2 text-white">
      <h1 className="text-white text-4xl text-center">Reset Password</h1>
      <form
        onSubmit={changePass}
        className="mt-6 flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center w-[40rem] my-6 border p-8">
          {/* <label htmlFor="username" className="text-2xl my-4">
            Username
          </label> */}
          <div></div>
          <div>
            <label htmlFor="oldPass" className="text-2xl">
              Old Password:{" "}
            </label>
            <input
              className="p-4 rounded-lg mb-4 text-black w-96"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              name="oldPassword"
              placeholder="Enter Old Password"
            />
          </div>

          <div>
            <label htmlFor="NewPass" className="text-2xl">
              New Password:{" "}
            </label>
            <input
              className="p-4 rounded-lg mb-4 text-black w-96"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              name="newPassword"
              placeholder="Enter New Password"
            />
          </div>
          <button
            type="submit"
            className=" text-white border w-36"
            style={{ fontSize: "2rem" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;
