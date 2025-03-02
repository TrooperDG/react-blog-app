import React, { useEffect, useState } from "react";
import { getTimeAgo } from "../../utility";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
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
            className="w-full h-full rounded-full  p-0.5 "
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
      <div className=" grow">
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
              className=" three-dots py-1 outline-gray-300 "
              onClick={() => setIsEditDeleteOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6a7282"
              >
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </svg>
            </button>
          )}
          {isEditDeleteOpen && (
            <div
              className={`rounded-sm overflow-hidden bg-gray-50 duration-100  absolute top-0 -left-24 `}
            >
              <button
                id="edit-comment"
                className=" p-1 mr-4  hover:bg-gray-100 active:bg-gray-100 outline-gray-300"
                onClick={handleEdit}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#6a7282"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>

              <button
                id="delete-comment"
                className="  p-1  hover:bg-gray-100 active:bg-gray-100 outline-gray-300 "
                onClick={() => handleDeleteComment(comment.$id)}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#6a7282"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Comment;
