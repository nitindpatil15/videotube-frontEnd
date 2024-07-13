import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      getvideos();
    } else {
      navigate("/login");
    }
  }, []);

  const videosinitial = [];
  // eslint-disable-next-line
  const [videos, setVideos] = useState(videosinitial);

  const host = "http://localhost:7500/api/v1";
  const getvideos = async () => {
    // API call
    try {
      const getVideos = await fetch(`${host}/videos/?page=1&limit=10`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const videos = await getVideos.json();
      setVideos(videos);
      console.log(videos);
      return videos;
    } catch (error) {
      console.log(error, ": Failed to Fetch API");
    }
  };
  return videos.map((video) => {
    <div className="">
      <div className="flex flex-wrap flex-row justify-evenly md:ml-32">
        <div className="video my-4">
          <div>
            <video
              controls
              key={video._id}
              src={video.avatar}
              poster={video.coverImage}
              className="border rounded-xl md:w-72 w-[22rem] h-48 md:ml-4"
            />
          </div>
          <div>
            <div className="flex flex-row ml-4">
              <div>
                <img
                  className="w-12 h-12 rounded-full mt-2 ml-2"
                  src={video.owner}
                  alt="Nitin"
                />
              </div>
              <div className="mx-3 text-white items-center">
                <p className="font-bold text-2xl text-white">
                  {video.description}
                </p>
                <p className="text-xl text-gray-400">{video.title}</p>
                <p className="text-gray-400">
                  {video.views}
                  <span>{video.createdAt}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  });
};

export default Video;
