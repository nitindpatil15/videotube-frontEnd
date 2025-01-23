import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userWatchHistory } from "../../Redux/Features/user/userSlice";
import { getTimeDifference } from "../../constant";

const WatchHistory = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.user.history);
  const error = useSelector((state) => state.user.historyError);
  const status = useSelector((state) => state.user.historyStatus);

  useEffect(() => {
    dispatch(userWatchHistory());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-white text-center">Error: {error}</div>;
  }
  return (
    <div className="flex flex-wrap justify-center md:justify-evenly md:ml-32">
      {videos && videos.length > 0 ? (
        videos.map((video) => (
          <div className="video my-4 w-96 cursor-pointer" key={video._id}>
            <div>
              <video
                controls
                src={video.videodoc}
                poster={video.thumbnail}
                className="border rounded-xl w-[22rem] h-48 md:ml-4 object-contain"
              />
            </div>
            <div className="flex flex-row ml-4">
              <img
                className="w-12 h-12 rounded-full mt-2 ml-2"
                src={video.owner.avatar} // Ensure this references the correct field
                alt="user"
              />
              <div className="mx-3 text-white items-center">
                <p className="font-bold text-xl text-white">{video.title}</p>
                <p className="text-gray-400">{video.description}</p>
                <div className="flex">
                  <p className="text-gray-400">{video.views} Views</p>
                  <p className="text-gray-400 mx-4">
                    {getTimeDifference(video.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="justify-start">Watch History is empty</h1>
      )}
    </div>
  );
};

export default WatchHistory;
