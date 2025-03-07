import React, { useEffect, useState } from "react";
import { getTimeAgo } from "../../utility";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { Query } from "appwrite";
databaseService;

function Comment({ comment, handleDeleteComment, handleEditComment }) {
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment.comment);
  const [commentCreator, setCommentCreator] = useState(null);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor =
    comment && userData ? comment.userId === userData.$id : false;

  function handleEdit() {
    setIsEditDeleteOpen(false);
    setIsEdit(true);
  }
  function handleCancelEdit() {
    setIsEdit(false);
    setEditComment(comment.comment);
  }
  function handleSubmitComment() {
    if (editComment.length === 0) {
      handleDeleteComment(comment.$id);
    } else if (editComment === comment.comment) {
      handleCancelEdit();
    } else {
      handleEditComment(comment.$id, editComment);
    }
    setIsEdit(false);
  }

  useEffect(() => {
    if (!comment?.userId) return;
    databaseService
      .getUser(comment.userId, [Query.select(["username", "avatar"])])
      .then((data) => setCommentCreator(data));
  }, [comment?.userId]);
  return (
    <>
      <div className=" w-8 h-8 ">
        {commentCreator && commentCreator.avatar ? (
          <img
            className="w-full h-full rounded-full object-cover p-0.5 "
            src={databaseService.getFilePreview(commentCreator.avatar)}
            alt={"user img"}
          />
        ) : (
          <svg
            className="w-full h-full rounded-full "
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
      <div className=" grow ">
        <h1 className="font-semibold text-slate-600 text-sm">
          @{commentCreator ? commentCreator.username : "_ _ _ _"}
          <small className="ml-2.5 ">{getTimeAgo(comment.$updatedAt)}</small>
        </h1>
        {/* <p>{comment.comment}</p> */}
        <div className=" flex items-end ">
          <textarea
            type="text"
            value={editComment}
            disabled={!isEdit}
            className={`${
              isEdit && "border-b-2"
            } border-gray-300   focus:border-gray-400 duration-100 outline-none w-full resize-none `}
            style={{ fieldSizing: "content" }}
            onChange={(e) => setEditComment(e.target.value)}
          ></textarea>
          {isEdit && (
            <>
              <button
                className="ml-2 mb-1 outline-gray-300"
                onClick={handleSubmitComment}
              >
                <svg
                  className="w-7 h-7 "
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#6a7282"
                >
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
              </button>
              <button
                className="ml-2 mb-1 outline-gray-300"
                onClick={handleCancelEdit}
              >
                <svg
                  className="w-7 h-7 "
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#6a7282"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      {isAuthor && (
        <div className="features relative ">
          {!isEdit && (
            <button
              className=" three-dots py-1 px-1 outline-gray-300 "
              onClick={() => setIsEditDeleteOpen((prev) => !prev)}
            >
              <SlOptionsVertical size={18} className="text-gray-500" />
            </button>
          )}
          <AnimatePresence>
            {isEditDeleteOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{
                  type: "tween",
                  duration: 0.06,
                  ease: "easeOut",
                }}
                className={`rounded-sm  duration-100   absolute -top-1  -left-26 `}
              >
                <button
                  id="edit-comment"
                  className="duration-100  p-2 mr-4 rounded-full bg-gray-500 hover:bg-gray-400 active:bg-gray-400 "
                  onClick={handleEdit}
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
                  onClick={() => handleDeleteComment(comment.$id)}
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
    </>
  );
}

export default Comment;
