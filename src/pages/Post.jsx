import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";
import {
  Container,
  Button,
  Loading,
  PostCard,
  PostComments,
} from "../components";

function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  // console.log(userData.$id, post.userId);
  useEffect(() => {
    if (postId) {
      databaseService.getPost(postId).then((post) => {
        if (post) {
          setPost(post);
          setCommentCount(post.commentIds.length);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [postId]);

  async function deletePost() {
    await databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.feturedImage);
        navigate("/");
      }
    });
  }

  if (loading) return <Loading />;
  return post ? (
    <div className="pt-1 md:py-5 ">
      <Container>
        {/* <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={databaseService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div> */}
        {/* <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-blue-500">{post.title}</h1>
        </div> */}
        {/* <div className="browser-css text-lg">{parse(post.content)}</div> */}
        <div className=" relative m-1  md:mx-4 ">
          {/* Edit Delete options */}
          {isAuthor && (
            <div className=" absolute right-2 top-5 md:right-8  ">
              <button
                className=" three-dots py-1 px-1 outline-gray-300"
                onClick={() => setIsEditDeleteOpen((prev) => !prev)}
              >
                <SlOptionsVertical size={18} className="text-gray-500" />
              </button>
              <AnimatePresence>
                {isEditDeleteOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "tween",
                      duration: 0.1,
                      ease: "easeOut",
                    }}
                    className={`rounded-sm  duration-100   absolute -top-1 -left-26 `}
                  >
                    <button
                      id="edit-comment"
                      className="duration-100  p-2 mr-4 rounded-full bg-gray-500 hover:bg-gray-400 active:bg-gray-400 "
                      onClick={() => navigate(`/edit-post/${post.$id}`)}
                      style={{ boxShadow: "0px 0px 10px 8px white" }}
                    >
                      <MdEdit
                        size={18}
                        className="duration-100 hover:scale-110 text-white"
                      />
                    </button>

                    <button
                      id="delete-comment"
                      className=" duration-100 p-2 text-white rounded-full bg-gray-500  hover:bg-gray-400  active:bg-gray-400 "
                      onClick={deletePost}
                      style={{ boxShadow: "0px 0px 10px 8px white" }}
                    >
                      <MdDeleteForever
                        size={18}
                        className="duration-100 hover:scale-110 "
                      />
                    </button>
                  </motion.div>

                  // <div
                  //   className={`rounded-sm overflow-hidden bg-gray-50 duration-100  absolute top-0 -left-24 `}
                  // >
                  //   <Link to={`/edit-post/${post.$id}`}>
                  //     <button
                  //       id="edit-comment "
                  //       className=" p-1 mr-4  hover:bg-gray-100 active:bg-gray-100 outline-gray-300"
                  //     >
                  //       <svg
                  //         className="w-6 h-6"
                  //         xmlns="http://www.w3.org/2000/svg"
                  //         height="24px"
                  //         viewBox="0 -960 960 960"
                  //         width="24px"
                  //         fill="#6a7282"
                  //       >
                  //         <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  //       </svg>
                  //     </button>
                  //   </Link>
                  //   <button
                  //     id="delete-comment"
                  //     className="  p-1  hover:bg-gray-100 active:bg-gray-100 outline-gray-300 "
                  //     onClick={deletePost}
                  //   >
                  //     <svg
                  //       className="w-6 h-6"
                  //       xmlns="http://www.w3.org/2000/svg"
                  //       height="24px"
                  //       viewBox="0 -960 960 960"
                  //       width="24px"
                  //       fill="#6a7282"
                  //     >
                  //       <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  //     </svg>
                  //   </button>
                  // </div>
                )}
              </AnimatePresence>
            </div>
          )}

          <PostCard {...post} isView={true} />
          <div
            id="comments"
            className=" relative outline-1 bg-white outline-gray-200 rounded-md py-4 mt-2 px-4 md:px-10"
          >
            <button className="flex items-center gap-1 text-xs  text-gray-500  transition absolute left-3 top-3 md:left-10 outline-gray-300">
              <span className="">{commentCount > 0 && commentCount}</span>
              <FaRegComment />
              <span>{commentCount <= 1 ? "Comment" : "Comments"}</span>
            </button>
            <PostComments
              currentPostId={postId}
              handleCommentCount={(count) => setCommentCount(count)}
            />
          </div>

          {/* <div id="post-data"></div> */}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
