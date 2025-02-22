import React from "react";
import databaseService from "../appwrite/database";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full shadow-md relative bg-gray-100 rounded-xl p-4">
        {/* <div className="absolute right-5 bottom-16 rounded-full w-2 h-2 bg-green-300  "></div> */}

        <div className="w-full justify-center mb-4 ">
          <img
            src={databaseService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-md w-full aspect-video object-cover"
          />
        </div>
        <div className=" h-7 overflow-hidden">
          <h2 className="text-md font-bold ">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
