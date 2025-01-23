import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVideos } from "../../Redux/Features/video/videosSlice";
import { getTimeDifference } from "../../constant";
import { useNavigate } from "react-router-dom";
import TruncateText from "../constant/Truncate";

const Video = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const error = useSelector((state) => state.videos.error);
  const status = useSelector((state) => state.videos.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllVideos());
    }
  }, [status, dispatch]);

  const handlevideobyId = (id) => {
    navigate(`/video/${id}`);
    window.location.href = `/video/${id}`;
  };

  const getchannelbyusername =(username)=>{
    navigate(`/channel/${username}`)
  }

  if (status === "loading") {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-white text-center">Error: {error}</div>;
  }

  const reverseVideos = [...videos].reverse();

  return (
    <div className="flex flex-wrap justify-center md:justify-evenly md:ml-4 mx-auto">
      {reverseVideos.map((video) => (
        <div className="video my-4 w-96 cursor-pointer mx-auto" key={video._id}>
          <div>
            <video
              src={video.videodoc}
              poster={video.thumbnail}
              onClick={() => handlevideobyId(video._id)}
              className="border bg-black rounded-xl w-[22rem] h-48 md:ml-4 object-cover"
            />
          </div>
          <div className="flex justify-between md:mx-3">
            <div className="flex flex-row md:ml-4">
              <img
                className="w-12 h-12 rounded-full mt-2 ml-2"
                src={video.avatar? video.avatar : "https://as2.ftcdn.net/v2/jpg/01/84/69/01/1000_F_184690158_x0WWVwP7TgmECZyMvEo9xYJtn51Fmr2a.jpg"}
                alt="user"
              />
              <div className="mx-3 text-white items-center">
                <div
                  className="font-bold text-xl text-white"
                  onClick={() => handlevideobyId(video._id)}
                >
                  <TruncateText text={video.description} maxWords={4} />
                </div>
                <p className=" text-gray-400" onClick={()=>getchannelbyusername(video.username)}>{video.username}</p>
                <div className="flex">
                  <p className="text-gray-400 ">{video.views} Views </p>
                  <p className="text-gray-400">
                    {getTimeDifference(video.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Video;
