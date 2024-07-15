import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Video = () => {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:7500/api/v1/videos/?page=1&limit=10', {}, {
          withCredentials: true // Include credentials in the request
        });
        setVideos(response.data);
        console.log("All Videos: ",videos)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  if (error) {
    return <div className='text-white md:ml-32'>Error: {error}</div>;
  }

  if (!videos) {
    return <div className='text-white md:ml-32'>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap flex-row justify-evenly md:ml-32">
      {videos.map((video) => (
        <div className="video my-4" key={video.data._id}>
          <div>
            <video
              controls
              src={video.data.avatar}
              poster={video.data.coverImage}
              className="border rounded-xl md:w-72 w-[22rem] h-48 md:ml-4"
            />
          </div>
          <div className="flex flex-row ml-4">
            <img
              className="w-12 h-12 rounded-full mt-2 ml-2"
              src={video.data.owner}
              alt={video.data.owner}
            />
            <div className="mx-3 text-white items-center">
              <p className="font-bold text-2xl text-white">
                {video.data.description}
              </p>
              <p className="text-xl text-gray-400">{video.data.title}</p>
              <p className="text-gray-400">
                {video.data.views} <span>{video.data.createdAt}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Video;
