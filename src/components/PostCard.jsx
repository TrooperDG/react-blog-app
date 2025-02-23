import React, { useState } from "react";
import databaseService from "../appwrite/database";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegComment, FaShare } from "react-icons/fa";

function PostCard({
  $id,
  title,
  featuredImage,
  username = "Nothing",
  userAvatar = "https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}) {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-md w-full border border-gray-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full ">
            {userAvatar && (
              <img
                src={userAvatar}
                className="w-full h-full rounded-full  object-cover"
              />
            )}
          </div>
          <span className="text-gray-700 font-semibold">{username}</span>
        </div>

        {/* Image */}
        <Link to={`/post/${$id}`}>
          <div className="w-full justify-center mb-4 ">
            {featuredImage && (
              <img
                src={databaseService.getFilePreview(featuredImage)}
                alt="Blog"
                className="w-full  object-cover aspect-video rounded-lg mb-3"
              />
            )}
          </div>
        </Link>
        {/* Title */}
        <h2 className="text-md  text-gray-900 mb-3">{title}</h2>

        {/* Actions */}
        <div className="flex items-center justify-between text-gray-600">
          <button
            className="flex items-center gap-1 hover:text-red-500 transition"
            onClick={() => setLiked(!liked)}
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>Like</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition">
            <FaRegComment /> <span>Comment</span>
          </button>
          <button className="flex items-center gap-1 hover:text-green-500 transition">
            <FaShare /> <span>Share</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCard;
