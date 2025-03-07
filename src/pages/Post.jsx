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
