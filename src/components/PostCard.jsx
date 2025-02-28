import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails } from "../store/userSlice";
import { Query } from "appwrite";
import { PostComments } from ".";

function PostCard({
  $id,
  title,
  featuredImage,
  userId,
  likedUserIds,
  commentUserIds,
}) {
  const [liked, setLiked] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [likeCount, setLikeCount] = useState(likedUserIds.length);
  // const [commentUserIds, setCommentUserIds] = useState([]);
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchData() {
    const user = await databaseService.getUser(userId, [
      Query.select(["username", "avatar"]),
    ]);
    setCreatorData(user);

    if (userDetails) {
      const likedIndex = likedUserIds.indexOf(userDetails.$id);
      if (likedIndex >= 0) setLiked(true);
    }
  }

  // console.log(likeCount, liked);
  async function handleLike() {
    if (userDetails) {
      setLiked((prev) => !prev);
      //! need a debouncing here
      let newLikedUserIds = likedUserIds;
      let newLikedPostIds = userDetails.likedPostIds;
      if (liked) {
        newLikedUserIds = likedUserIds.filter(
          (userId) => userId !== userDetails.$id
        );
        newLikedPostIds = userDetails.likedPostIds.filter(
          (postId) => postId !== $id
        );
      } else {
        newLikedUserIds = [...likedUserIds, userDetails.$id];
        newLikedPostIds = [...userDetails.likedPostIds, $id];
      }
      setLikeCount(newLikedUserIds.length);

      await databaseService.updatePost($id, { likedUserIds: newLikedUserIds });

      //*updating user collection
      await databaseService.updateUser(userDetails.$id, {
        likedPostIds: newLikedPostIds,
      });
      dispatch(
        addUserDetails({
          ...userDetails,
          likedPostIds: newLikedPostIds,
        })
      );
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchData();
  }, [userDetails]);
  return (
    <>
      <div className="bg-white p-4 rounded-2xl shadow-md w-full border border-gray-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full ">
            {creatorData && creatorData.avatar ? (
              <img
                src={databaseService.getFilePreview(creatorData.avatar)}
                className="w-full h-full rounded-full  object-cover outline-2 outline-slate-400"
              />
            ) : (
              <svg
                className="w-full h-full "
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6a7282"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
            )}
          </div>
          <span className="text-gray-700 font-semibold">
            {creatorData && creatorData.username}
          </span>
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
            onClick={handleLike}
          >
            {likeCount > 0 ? likeCount : null}
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

        <PostComments currentPostId={$id} />
      </div>
    </>
  );
}

export default PostCard;
