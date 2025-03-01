import { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment, FaShare } from "react-icons/fa";
// import { Avatar } from "@/components/ui/avatar";

const BlogCard = ({
  userAvatar = "https://static.vecteezy.com/system/resources/thumbnails/049/855/347/small/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg",
  username = "LucyDG",
  title = "Amazing view of kipu",
  image = "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80",
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-80 border border-gray-200">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full ">
          {userAvatar && (
            <img
              src={userAvatar}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <span className="text-gray-700 font-semibold">{username}</span>
      </div>

      {/* Image */}
      {image && (
        <img
          src={image}
          alt="Blog"
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>

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
  );
};

export default BlogCard;

// <div className="bg-white p-4 rounded-2xl shadow-md w-full border border-gray-200">
//   {/* User Info */}
//   <div className="flex items-center gap-3 mb-3">
//     <div className="w-10 h-10 bg-gray-300 rounded-full ">
//       {userAvatar && (
//         <img
//           src={userAvatar}
//           className="w-full h-full rounded-full  object-cover"
//         />
//       )}
//     </div>
//     <span className="text-gray-700 font-semibold">{username}</span>
//   </div>

//   {/* Image */}
//   <Link to={`/post/${$id}`}>
//     <div className="w-full justify-center mb-4 ">
//       {featuredImage && (
//         <img
//           src={databaseService.getFilePreview(featuredImage)}
//           alt="Blog"
//           className="w-full  object-cover aspect-video rounded-lg mb-3"
//         />
//       )}
//     </div>
//   </Link>
//   {/* Title */}
//   <h2 className="text-md  text-gray-900 mb-3">{title}</h2>

//   {/* Actions */}
//   <div className="flex items-center justify-between text-gray-600">
//     <button
//       className="flex items-center gap-1 hover:text-red-500 transition"
//       onClick={() => setLiked(!liked)}
//     >
//       {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//       <span>Like</span>
//     </button>
//     <button className="flex items-center gap-1 hover:text-blue-500 transition">
//       <FaRegComment /> <span>Comment</span>
//     </button>
//     <button className="flex items-center gap-1 hover:text-green-500 transition">
//       <FaShare /> <span>Share</span>
//     </button>
//   </div>
// </div>;

// if (isSidebar) {
//   // navRef.current.style.display = "none";
//   navRef.current.style.left = "-55vw";
//   setIsSIdeBar((prev) => !prev);
// } else {
//   // navRef.current.style.display = "block";
//   navRef.current.style.left = "0px";
//   setIsSIdeBar((prev) => !prev);
// }

// async function fetchData() {
//   const user = await databaseService.getUser(userId, [
//     Query.select(["username", "avatar"]),
//   ]);
//   setCreatorData(user);

//   if (userDetails) {
//     const likedIndex = likedUserIds.indexOf(userDetails.$id);
//     if (likedIndex >= 0) setLiked(true);
//   }
// }

// const debouncedLog = debounce((func) => {
//   func();
// }, 1000);

// async function handleLike() {

//   if (userDetails) {
//     setLiked((prev) => !prev);

//     //! need a debouncing here
//     let newLikedUserIds = [...likedUserIds];
//     let newLikedPostIds = [...userDetails.likedPostIds];
//     if (liked) {
//       newLikedUserIds = likedUserIds.filter(
//         (userId) => userId !== userDetails.$id
//       );
//       newLikedPostIds = userDetails.likedPostIds.filter(
//         (postId) => postId !== $id
//       );
//     } else {
//       newLikedUserIds = [...likedUserIds, userDetails.$id];
//       newLikedPostIds = [...userDetails.likedPostIds, $id];
//     }
//     setLikeCount(newLikedUserIds.length);

//     await databaseService.updatePost($id, { likedUserIds: newLikedUserIds });

//     //*updating user collection
//     await databaseService.updateUser(userDetails.$id, {
//       likedPostIds: newLikedPostIds,
//     });
//     dispatch(
//       addUserDetails({
//         ...userDetails,
//         likedPostIds: newLikedPostIds,
//       })
//     );
//   } else {
//     navigate("/login");
//   }

// }
