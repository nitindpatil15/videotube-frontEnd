import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getchannelbyusername,
  toggleSubscribe,
} from "../../Redux/Features/channel/ChannelSlice"; // Adjust the import path
import "material-icons/iconfont/material-icons.css";
import { useNavigate, useParams } from "react-router-dom";
import { getTimeDifference } from "../../constant";
import TruncateText from "../constant/Truncate";

const GetChannel = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const channel = useSelector((state) => state.channel);
  const { data, status, error } = channel;

  useEffect(() => {
    dispatch(getchannelbyusername(username));
  }, [dispatch, username]);

  const toggleSubscription = (channelId) => {
    dispatch(toggleSubscribe(channelId));
  };

  const handlevideobyId = (id) => {
    navigate(`/video/${id}`);
    window.location.href = `/video/${id}`;
  };

  if (status === "loading")
    return <div className="text-white text-center">Loading...</div>;
  if (status === "failed")
    return <div className="text-white text-center">Error: {error}</div>;

  return (
    <div className="md:ml-52 ml-4">
      {data ? (
        <>
          <div className="text-white flex justify-between border-b-2 py-4 mx-6">
            <div className="flex items-center">
              <div className="mx-6 mt-2 flex flex-col">
                <img
                  src={data.channel.avatar}
                  alt="avatar"
                  className="w-42 md:w-48 md:h-48 border-2 rounded-full"
                />
              </div>
              <div>
                <div>
                  <div className="text-white my-2 mx-2 font-bold text-4xl">
                    {data.channel.fullName}
                  </div>
                  <p className="text-gray-400 my-2 mx-2 font-bold">
                    @{data.channel.username}
                  </p>
                  <p className="text-white font-bold flex items-center">
                    <span className="material-icons mx-2 mt-1">email</span>
                    {data.channel.email}
                  </p>
                  <div className="flex my-2">
                    <div className="text-gray-500 ml-2">
                      {data.channel.subscribeToCounter} Subscribe
                    </div>
                    <div className="text-gray-500 mx-2">
                      {data.channel.subscribersCounter} Subscribers{" "}
                    </div>
                  </div>
                </div>

                {/* Subscribe Button  */}
                {data.channel.isSubscribed ? (
                  <button
                    onClick={()=>toggleSubscription(data.channel._id)}
                    className="flex items-center bg-black border p-1 rounded-lg font-medium"
                  >
                    <span className="material-icons">notifications_active</span>{" "}
                    Subscribed
                  </button>
                ) : (
                  <button
                    onClick={()=>toggleSubscription(data.channel._id)}
                    className="flex items-center border p-1 rounded-lg hover:bg-gray-700 font-medium"
                  >
                    <span className="material-icons">notifications</span>{" "}
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="playlist text-white flex flex-col justify-self-center my-5 mx-16">
            <div className=" text-white flex justify-self-center my-5 font-bold">
              <h1 className="uppercase">All Videos</h1>
              <h1 className="uppercase cursor-pointer mx-4">Tweets</h1>
            </div>
            <div className="flex flex-wrap">
              {data.channelvideos.map((video) => {
                return (
                  <>
                    <div
                      className="video my-4 w-96 cursor-pointer"
                      key={video._id}
                    >
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
                            src={data.channel.avatar}
                            alt="user"
                          />
                          <div className="mx-3 text-white items-center">
                            <div
                              className="font-bold text-xl text-white capitalize"
                              onClick={() => handlevideobyId(video._id)}
                            >
                              <TruncateText
                                text={video.description}
                                maxWords={4}
                              />
                            </div>
                            <p className=" text-gray-400">
                              {data.channel.username}
                            </p>
                            <div className="flex">
                              <p className="text-gray-400 mx-2">
                                {video.views} Views
                              </p>
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
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div>No Channel Data</div>
      )}
    </div>
  );
};

export default GetChannel;
