import React, { useEffect, useState, useCallback } from "react";
import databaseService from "../appwrite/database";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaShare,
} from "react-icons/fa";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails } from "../store/userSlice";
import { Query } from "appwrite";
import { PostComments } from ".";
import { debounce } from "../utility";

function PostCard({
  $id,
  title,
  featuredImage,
  userId,
  content,
  likedUserIds,
  commentIds,
  isView = false,
}) {
  const [liked, setLiked] = useState(false);
  const [creatorData, setCreatorData] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likedUserIds.length);
  const [commentCount, setCommentCount] = useState(commentIds.length);
  // const [commentUserIds, setCommentUserIds] = useState([]);
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // new optimized handleLike
  const handleLike = useCallback(
    debounce(async () => {
      if (!userDetails) {
        navigate("/login");
        return;
      }
      let updatedLikedUserIds = new Set(likedUserIds);
      let updatedLikedPostIds = new Set(userDetails.likedPostIds);

      if (liked) {
        setLiked(false);
        updatedLikedUserIds.delete(userDetails.$id);
        updatedLikedPostIds.delete($id);
      } else {
        setLiked(true);
        updatedLikedUserIds.add(userDetails.$id);
        updatedLikedPostIds.add($id);
      }
      setLikeCount(updatedLikedUserIds.size);
      try {
        await databaseService.updatePost($id, {
          likedUserIds: Array.from(updatedLikedUserIds),
        });

        await databaseService.updateUser(userDetails.$id, {
          likedPostIds: Array.from(updatedLikedPostIds),
        });

        dispatch(
          addUserDetails({
            ...userDetails,
            likedPostIds: Array.from(updatedLikedPostIds),
          })
        );
      } catch (error) {
        console.error("Error updating like:", error);
      }
    }, 500), // Debounce time: 500ms
    [userDetails, likedUserIds, $id]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const user = await databaseService.getUser(userId, [
          Query.select(["username", "avatar"]),
        ]);

        if (isMounted) setCreatorData(user);
        if (userDetails && isMounted) {
          const likedIndex = likedUserIds.indexOf(userDetails.$id);
          if (likedIndex >= 0) setLiked(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [userDetails?.$id]);
  return (
    <>
      <div
        className={`bg-white p-4  ${
          isView && "md:px-10"
        } w-full border rounded-md border-gray-200 `}
      >
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
          <div className={`w-full flex justify-center mb-3  `}>
            {featuredImage && (
              <img
                src={databaseService.getFilePreview(featuredImage)}
                alt="Blog"
                className={` ${
                  isView
                    ? " max-h-[50vh] object-contain "
                    : "object-cover max-h-90 md: md:max-h-120 "
                } rounded-lg   w-full`}
              />
            )}
          </div>
        </Link>
        {/* Title */}
        <h2 className="text-md font-semibold  text-gray-700  mb-4">{title}</h2>
        {/* Content */}

        {/* Like Share Comment */}
        <div className="flex items-center justify-between text-gray-600 border-t pt-2 border-gray-200">
          <button
            className="flex items-center gap-1 hover:text-red-500 outline-gray-200 transition"
            onClick={handleLike}
          >
            <span className="">{likeCount > 0 && likeCount}</span>
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{commentCount <= 1 ? "Like" : "Likes"}</span>
          </button>
          {!isView && (
            <button
              className={`flex items-center gap-1 hover:text-blue-500 transition outline-gray-200 ${
                isCommentOpen && "text-blue-500"
              }`}
              onClick={() => setIsCommentOpen((prev) => !prev)}
            >
              <span className="">{commentCount > 0 && commentCount}</span>
              {isCommentOpen ? <FaComment /> : <FaRegComment />}
              <span>{commentCount <= 1 ? "Comment" : "Comments"}</span>
            </button>
          )}
          <button className="flex items-center gap-1 hover:text-green-500 transition outline-gray-200">
            <FaShare /> <span>Share</span>
          </button>
        </div>
        {isView && (
          <div className="browser-css text-lg mt-3">{parse(content)}</div>
        )}

        {!isView && isCommentOpen && (
          <PostComments
            handleCloseComment={() => setIsCommentOpen(false)}
            fixedPosition={true}
            currentPostId={$id}
            handleCommentCount={(count) => setCommentCount(count)}
          />
        )}
      </div>
    </>
  );
}

export default PostCard;
