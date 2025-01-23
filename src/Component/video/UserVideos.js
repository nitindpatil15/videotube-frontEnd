import React, { useEffect, useState } from "react";
import { getTimeDifference } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserVideos } from "../../Redux/Features/user/userSlice";
import { useNavigate } from "react-router-dom";
import TruncateText from "../constant/Truncate";

const UserVideos = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videos = useSelector((state) => state.user.userVideos);
  const status = useSelector((state) => state.user.userVideosStatus);
  const error = useSelector((state) => state.user.userVideosError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getUserVideos());
    }
    // eslint-disable-next-line
  }, []);
  const handlevideobyId = (id) => {
    navigate(`/video/${id}`);
    window.location.href = `/video/${id}`;
  };

  if (error) {
    return <div className="text-white md:ml-32">Error: {error}</div>;
  }

  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <div className="text-white md:ml-32 mt-5 text-start">
        You Didn't Uploaded Video here...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap flex-row justify-evenly md:ml-10">
      {videos.map((video) => (
        <div className="video my-4 w-96 cursor-pointer" key={video._id}>
          <div>
            <video
              src={video.videodoc}
              poster={video.thumbnail}
              onClick={() => handlevideobyId(video._id)}
              className="border bg-black rounded-xl w-[22rem] h-48 md:ml-4 object-cover"
            />
            {hoveredVideo === video._id && ( // Conditional rendering of the play button on hover
              <div className="absolute inset-0 flex justify-center items-center hover:bg-gray-700 hover:bg-opacity-20">
                <button
                  className="relative top-[-2rem] play-button w-12 h-12 rounded-full bg-gray-700 bg-opacity-80 flex justify-center items-center"
                  onClick={() => handlevideobyId(video._id)}
                >
                  <svg
                    xmlns="https://cdn3.iconfinder.com/data/icons/iconic-1/32/play_alt-512.png"
                    className="h-8 w-8 text-white rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-6.207-3.214A1 1 0 007 8.882v6.236a1 1 0 001.545.832l6.207-3.214a1 1 0 000-1.664z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-between mx-3">
            <div className="flex flex-row ml-4">
              <img
                className="w-12 h-12 rounded-full mt-2 ml-2"
                src={props.avatar}
                alt="user"
              />
              <div className="mx-3 text-white items-center">
                <p
                  className="font-bold text-xl text-white capitalize"
                  onClick={() => handlevideobyId(video._id)}
                >
                  <TruncateText text={video.description} maxWords={4} />
                </p>
                <p className=" text-gray-400">{props.username}</p>
                <div className="flex">
                  <p className="text-gray-400 mx-2">{video.views} Views</p>
                  <p className="text-gray-400">
                    {getTimeDifference(video.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <span className="material-icons p-2">more_vert</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserVideos;
