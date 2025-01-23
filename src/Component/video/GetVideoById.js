import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllVideos, videobyId } from "../../Redux/Features/video/videosSlice";
import { getTimeDifference } from "../../constant";
import TruncateText from "../constant/Truncate";
import "material-icons/iconfont/material-icons.css";
import { fetchCurrentUser } from "../../Redux/Features/user/userSlice";
import {
  AddComment,
  DeleteComment,
  GetVideoComment,
} from "../../Redux/Features/Comment/commentSlice";
import { toggleSubscribe } from "../../Redux/Features/channel/ChannelSlice";

const GetVideoById = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, videobyIderror, videobyIdstatus } = useSelector(
    (state) => state.videos
  );
  const user = useSelector((state) => state.user.currentuser);
  const { videos } = useSelector((state) => state.videos);
  const { comments } = useSelector((state) => state.comment);
  const { subscribe } = useSelector((state) => state.channel);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllVideos());
    dispatch(GetVideoComment(id));
    if (videobyIdstatus === "idle") {
      dispatch(videobyId(id));
    }
  }, [dispatch, id, videobyIdstatus]);

  const toggleSubscription = (channelId) => {
    dispatch(toggleSubscribe(channelId));
  };

  const handlevideobyId = (id) => {
    navigate(`/video/${id}`);
    window.location.href = `/video/${id}`;
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(AddComment({ videoId: id, content }))
      .unwrap()
      .then(() => {
        setContent("");
        dispatch(GetVideoComment(id));
      })
      .catch((err) => {
        console.error("Failed to register:", err);
      });
  };

  const handledeleteComment = (commentid) => {
    dispatch(DeleteComment(commentid))
      .unwrap()
      .then(() => {
        dispatch(GetVideoComment(id));
      });
  };

  const getchannelbyusername = (username) => {
    navigate(`/channel/${username}`);
  };

  // Function to handle video download
  const handleDownload = (videoUrl, videoTitle) => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `${videoTitle}.mp4`; // Provide a filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  if (videobyIdstatus === "loading") {
    return <div className="text-center text-white text-3xl">Loading...</div>;
  }
  if (videobyIderror) {
    return (
      <div className="text-center text-white text-3xl">
        Network Issue, check your connection
      </div>
    );
  }

  const randomVideos = [...videos].sort(() => Math.random() - 0.5);

  return (
    <div className="bg-gray-700 mt-5 text-black md:ml-20 md:flex">
      {/* Video by Id */}
      <div className="mx-4">
        {/* Video */}
        <div className="mx-auto">
          <video
            controls
            autoPlay
            src={video.videodoc}
            poster={video.thumbnail}
            className="bg-black border rounded-xl w-[50rem] md:w-[56rem] md:h-[29rem] object-contain"
          />
        </div>

        {/* Video Title */}
        <h1 className="ml-2 my-1 font-bold text-2xl text-white capitalize">
          {video.title}
        </h1>

        {/* Video Details */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex flex-row ml-4">
              <img
                className="w-10 h-10 rounded-full mt-2 cursor-pointer"
                src={video.avatar}
                alt="user"
                onClick={() => getchannelbyusername(video.username)}
              />
              <div className="mx-3 text-white items-center">
                <p className="text-xl">{video.username}</p>
              </div>
            </div>
            <div>
              {video && video.owner ? (
                <button
                  className="border-2 text-white bg-red-600 p-1 rounded-lg"
                  onClick={() => toggleSubscription(video.owner)}
                >
                  {subscribe ? "Subscribed" : "Subscribe"}
                </button>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>

          <div className="flex mr-5 text-white">
            <button className="p-1 h-9 mx-2 rounded-lg bg-slate-500 material-icons hover:bg-slate-400">
              favorite
              {video.like ? (
                <span className="text-white">{video.like}</span>
              ) : (
                <span className="text-white">0</span>
              )}
            </button>
            <span
              className="material-icons p-2 bg-slate-500 h-9 rounded-lg hover:bg-slate-400 cursor-pointer"
              onClick={() => handleDownload(video.videodoc, video.title)} // Download button
            >
              download
            </span>
          </div>
        </div>

        {/* Description section */}
        <div className="border-2 m-2 rounded-lg p-2 px-8 w-auto text-white bg-gray-700">
          <p className="font-bold">
            {video.views} views {getTimeDifference(video.createdAt)}
          </p>
          <div className="">{video.description}</div>
        </div>

        {/* Current user and comment adding */}
        <div className="my-6 flex">
          <div className="mx-2">
            <img
              src={
                user
                  ? user?.data?.avatar
                  : "https://as2.ftcdn.net/v2/jpg/01/84/69/01/1000_F_184690158_x0WWVwP7TgmECZyMvEo9xYJtn51Fmr2a.jpg"
              }
              className="border-2 w-12 h-12 rounded-full"
              alt="user"
            />
          </div>
          <form onSubmit={handleComment}>
            <input
              className="p-2 text-white border-gray-700  bg-gray-700 border-b-2 w-auto md:w-[40rem]"
              type="text"
              htmlFor="content"
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add Your Comment"
            />

            <button
              type="submit"
              className=" mx-2 p-2 h-10 bg-white  text-black rounded-lg"
            >
              Comment
            </button>
          </form>
        </div>

        {/*Comments Of Videos*/}
        <div className="m-2 rounded-lg h-auto p-4 bg-gray-600">
          {comments?.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex flex-wrap my-2 bg-slate-500 rounded-lg"
              >
                <div className="flex items-center justify-around">
                  <div className="flex justify-between">
                    <img
                      onClick={(e) =>
                        getchannelbyusername(comment.owner[0].username)
                      }
                      src={comment.owner[0].avatar}
                      alt="Avatar"
                      className="w-14 h-14 rounded-full p-2 cursor-pointer"
                    />
                    <div className="mx-2">
                      <div className="flex">
                        <div
                          className="font-bold cursor-pointer"
                          onClick={(e) =>
                            getchannelbyusername(comment.owner[0].username)
                          }
                        >
                          {comment.owner[0].fullName}
                        </div>
                        <span className="font-semibold mx-4">
                          {getTimeDifference(comment.createdAt)}
                        </span>
                      </div>
                      <div className="flex">
                        <div>{comment.content}</div>
                      </div>
                    </div>
                  </div>
                  <span
                    className="material-icons p-4 cursor-pointer"
                    onClick={() => handledeleteComment(comment._id)}
                  >
                    delete
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Videos */}
      <div className=" block md:flex md:flex-col ">
        {randomVideos.map((video) => (
          <div
            className=" block md:flex video my-2 cursor-pointer"
            key={video._id}
          >
            <div>
              <video
                src={video.videodoc}
                poster={video.thumbnail}
                onClick={() => handlevideobyId(video._id)}
                className="border bg-black rounded-xl w-96 h-48 md:w-60 md:h-32 md:ml-4 object-cover mx-auto"
              />
            </div>
            <div className="flex flex-row md:ml-2 ml-12 mx-auto">
              <div
                className="mx-3 text-white items-center"
                onClick={() => handlevideobyId(video._id)}
              >
                <TruncateText text={video.description} maxWords={4} />
                <div className="flex md:block text-gray-400 text-sm">
                  <div className="flex md:block">
                    <img
                      className=" text-gray-200 w-10 h-10 rounded-full md:hidden"
                      src={video.avatar} alt="avatar"
                    />
                  </div>
                  <div className="ml-4 md:ml-0">
                    <p className="ml-2 md:ml-0 text-gray-200">
                      {video.username}
                    </p>{" "}
                    {video.views} views {getTimeDifference(video.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetVideoById;
