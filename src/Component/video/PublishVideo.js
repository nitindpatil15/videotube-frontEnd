import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {publishvideo} from "../../Redux/Features/video/videosSlice"

const PublishVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publishstatus } = useSelector((state) => state.videos);
  const [credentials, setCredentials] = useState({
    videoFile: null,
    title: "",
    description: "",
    thumbnailFile: null,
  });
  const [error, setError] = useState("");

  // Max video file size is 40MB (40 * 1024 * 1024 bytes)
  const maxFileSize = 40 * 1024 * 1024;

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setError("Video file size exceeds 40MB");
      setCredentials((prev) => ({ ...prev, videoFile: null }));
    } else {
      setError("");
      setCredentials((prev) => ({ ...prev, videoFile: file }));
    }
  };

  const handleThumbnailUpload = (e) => {
    setCredentials((prev) => ({ ...prev, thumbnailFile: e.target.files[0] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !credentials.videoFile ||
      !credentials.thumbnailFile ||
      !credentials.title ||
      !credentials.description
    ) {
      setError("All fields are required.");
      return;
    }

    // Creating FormData to send files along with text fields
    const formData = new FormData();
    formData.append("videodoc", credentials.videoFile);
    formData.append("thumbnail", credentials.thumbnailFile);
    formData.append("title", credentials.title);
    formData.append("description", credentials.description);

    dispatch(publishvideo(formData)).then(() => {
      if (publishstatus === "loading") {
        <div className="Text Center">Uploading Video ...</div>;
      }
      console.log("Uploading:", { formData });
      alert("Form submitted successfully!");
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center md:w-[80rem] h-full bg-gray-100 md:ml-[13rem] mx-auto">
      <h2 className="text-2xl font-semibold text-center my-4 border-dotted border-4 border-indigo-400 p-2 rounded-lg">Upload Video</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap flex-col justify-evenly bg-white shadow-lg rounded-lg p-6 md:w-full"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4 mx-4">
          <label className="block text-xl font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={credentials.title}
            onChange={handleInputChange}
            className="mt-2 w-80 px-6 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter video title"
          />
        </div>

        <div className="flex flex-col items-center justify-center mb-4 mx-4">
          <label className="block text-xl font-medium text-gray-700 mb-2 text-center">
            Video File (Max: 40MB)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="w-full h-[20rem] px-3 py-2 border-blue-600 border-4 rounded-md shadow-sm border-dotted"
          />
        </div>

        <div className="mb-4 mx-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={credentials.description}
            onChange={handleInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter video description"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4 mx-4">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="mt-2 w-full h-40 px-3 py-2 border-blue-600 border-4 border-dotted rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {publishstatus === "loading" ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default PublishVideo;
