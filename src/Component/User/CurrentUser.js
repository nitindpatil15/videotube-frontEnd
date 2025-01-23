import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import { fetchCurrentUser, UserAvatarUpdate } from '../../Redux/Features/user/userSlice';
import Stats from "../User/Stats";
import UserVideos from "../video/UserVideos";
import WatchHistory from "../User/WatchHistory";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentuser);
  const status = useSelector((state) => state.user.status);
  const avatarStatus = useSelector((state) => state.user.avatarStatus);

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (avatarStatus === 'succeeded') {
      dispatch(fetchCurrentUser());
    }
  }, [avatarStatus, dispatch]);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      if (avatarStatus === 'idle') {
        dispatch(UserAvatarUpdate(formData));
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  if (status === 'loading') {
    return <div className="text-white text-center">Loading...</div>;
  }
  if (avatarStatus === 'loading') {
    return <div className="text-white text-center">Loading...</div>;
  }
  if (status === 'failed') {
    return <div className="text-white text-center text-4xl h-96 flex justify-center items-center">Login Again <Link to='/login' className="text-indigo-500 mx-2"> Go to Login</Link></div>;
  }

  if (!user) {
    return null; // Or handle the case where user is not available
  }

  return (
    <div className="md:ml-36 ">
      <div className="text-white flex justify-between border-b-2 py-4 mx-6">
        <div className="flex items-center">
          <div className="mx-6 mt-2 flex flex-col w-32">
            <img
              src={user.data.avatar}
              alt="avatar"
              className="w-42 md:w-32 h-32 border-2 rounded-full"
            />
            <input type="file" accept="image/*" className="w-24 ml-4 rounded-lg mt-1 cursor-pointer" onChange={handleFileChange} />
            <button onClick={handleAvatarUpload} className="border rounded-lg w-16 my-1 ml-7 p-1">Upload</button>
          </div>
          <div className="mt-[-1.7rem]">
            <h1 className="text-white text-2xl md:text-4xl mx-2 font-bold">
              {user.data.fullName}
              <Link className="text-white material-icons p-2 rotate-6 hover:bg-white hover:text-black rounded-full" to='/edit-detail'>edit</Link>
            </h1>
            <p className="text-gray-400 my-2 mx-2 font-bold">
              {user.data.username}
            </p>
            <p className="text-white font-bold flex items-center">
              <span className="material-icons mx-2 mt-1">email</span>
              {user.data.email}
            </p>
            <Stats />
          </div>
        </div>
      </div>

      <div className="Wachlist text-white flex flex-col my-5 mx-16 mt-16 border-b-2 pb-3">
        <h1 className="uppercase">Watch History</h1>
        <WatchHistory/>
      </div>
      <div className="playlist text-white flex flex-col my-5 mx-16 border-b-2 pb-3">
        <h1 className="uppercase">Playlists</h1>
        <div className="text-center">Playlists</div>
      </div>
      <div className="playlist text-white flex flex-col my-5 mx-16 border-b-2 pb-3">
        <h1 className="uppercase">Tweets</h1>
      </div>
      <div className="playlist text-white flex flex-col my-5 mx-16 border-b-2 pb-3">
        <h1 className="uppercase">Channel Videos</h1>
        <UserVideos avatar={user.data.avatar} username={user.data.username} />
      </div>
    </div>
  );
};

export default CurrentUser;
