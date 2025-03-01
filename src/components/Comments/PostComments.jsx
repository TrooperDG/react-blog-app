import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import databaseService from "../../appwrite/database";
import { Query } from "appwrite";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function PostComments({ currentPostId, handleCommentCount }) {
  const [postComments, setPostComments] = useState([]);

  const userDetails = useSelector((state) => state.user.userDetails);
  const { register, handleSubmit, setValue } = useForm();

  async function fetchComments() {
    const comments = await databaseService.getComments([
      Query.equal("postId", [currentPostId]),
    ]);
    setPostComments(comments.documents);
  }
  async function submit(data) {
    let newPostComments = postComments;
    data.comment = data.comment.trim();
    const comment = await databaseService.createComment({
      ...data,
      postId: currentPostId,
      userId: userDetails.$id,
    });
    setPostComments([...postComments, comment]);

    newPostComments = [...postComments, comment];
    const newPostCommentIds = newPostComments.map((comment) => comment.$id);
    await databaseService.updatePost(currentPostId, {
      commentIds: newPostCommentIds,
    });

    // await databaseService.updateUser(userDetails.$id, {
    //   commentIds: newPostCommentIds,
    // });
    setValue("comment", "");
    handleCommentCount(newPostComments.length);
  }

  async function handleDeleteComment(commentId) {
    const newComments = postComments.filter(
      (comment) => comment.$id !== commentId
    );

    setPostComments(newComments);
    handleCommentCount(newComments.length);
    const newPostCommentIds = newComments.map((comment) => comment.$id);
    try {
      await databaseService.deleteComment(commentId);
      await databaseService.updatePost(currentPostId, {
        commentIds: newPostCommentIds,
      });
    } catch (error) {
      console.log("handleDeleteComment :: ", error);
    }
  }
  async function handleEditComment(commentId, newComment) {
    setPostComments((prev) =>
      prev.map((item) =>
        item.$id === commentId
          ? { ...item, comment: newComment, $updatedAt: new Date() }
          : item
      )
    );

    try {
      await databaseService.updateComment(commentId, { comment: newComment });
    } catch (error) {
      console.log("handleEditComment :: ", error);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [currentPostId]);
  return (
    <div className="w-full rounded-md py-3  mt-2.5 duration-100">
      <form onSubmit={handleSubmit(submit)}>
        <div className=" flex items-end ">
          <textarea
            type="text"
            placeholder="Add a comment"
            className=" py-2  border-b-2 border-gray-300 focus:border-gray-400 duration-100 outline-none w-full resize-none "
            {...register("comment", { required: true })}
            style={{ fieldSizing: "content" }}
          ></textarea>
          <button className="ml-2 mb-1 outline-gray-300" type="submit">
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
        </div>
      </form>
      <div>
        <ul className="mt-1.5 scrollable-content overflow-auto max-h-60 ">
          {postComments.length > 0 ? (
            [...postComments]
              .sort((a, b) => {
                return new Date(b.$updatedAt) - new Date(a.$updatedAt);
              })
              .map((comment) => (
                <li
                  key={comment.$id}
                  className="flex gap-2 items-center mt-4 mb-1 w-full "
                >
                  <Comment
                    comment={comment}
                    handleDeleteComment={(commentId) =>
                      handleDeleteComment(commentId)
                    }
                    handleEditComment={(commentId, newComment) =>
                      handleEditComment(commentId, newComment)
                    }
                  />
                </li>
              ))
          ) : (
            <p className="text-gray-400 text-sm ">No comments yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}
