import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditUserProfile,
  fetchCurrentUser,
} from "../../Redux/Features/user/userSlice";
import { useNavigate } from "react-router-dom";

const EditDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentuser);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [credentials, setCredentials] = useState({
    fullName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCurrentUser());
    } else if (status === "succeeded" && user) {
      setCredentials({
        fullName: user.data.fullName,
        username: user.data.username,
        email: user.data.email,
        avatar:user.data.avatar
      });
    }
  }, [status, dispatch, user]);

  if (status === "loading") {
    return <div className="text-white md:ml-32">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-white md:ml-32">Error: {error}</div>;
  }

  if (!user) {
    return null; // Or handle the case where user is not available
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", credentials.fullName);
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);

    dispatch(EditUserProfile(formData))
      .unwrap()
      .then(() => {
        alert("Details Updated Successfully");
        navigate("/current-user");
      })
      .catch((error) => {
        alert("Error Updating Details");
      });
  };

  return (
    <div className="md:ml-42 flex items-center justify-center">
      <form onSubmit={handleEditProfile} className="flex flex-col mx-4 w-96">
        <h1 className="text-center text-indigo-500 text-4xl">Update Details</h1>
        <div className="flex flex-col mt-10">
          <p className="text-indigo-400 text-xl border px-2 w-72 rounded-lg">
            Note:{" "}
            <span className="text-white text-xl">'*'Fields are Required</span>
          </p>
          <img
            src={credentials.avatar}
            alt=""
            className="mt-2 w-24 h-24 rounded-full flex items-center justify-center"
          />
          <label className="text-white font-bold my-2 mt-4 text-2xl">
            Username : {credentials.username}
          </label>
          <label className="text-white font-bold my-2 mt-4 text-2xl">
            Full Name<span className="text-red-600">*</span>
          </label>
          <input
            className="p-2 rounded-lg"
            type="text"
            name="fullName"
            id="fullName"
            value={credentials.fullName}
            onChange={handleInputChange}
            placeholder="Enter Full Name"
            required
          />
          <label className="text-white font-bold my-2 mt-4 text-2xl">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            className="p-2 rounded-lg"
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            required
          />

          <button
            className="bg-blue-700 my-3 p-2 rounded hover:text-white hover:bg-indigo-600"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDetails;
