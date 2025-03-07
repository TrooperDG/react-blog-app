import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import databaseService from "../../appwrite/database";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RTE, Input, Select, Button, Loading } from "../index";
import imageCompression from "browser-image-compression";

function PostForm({ post }) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      featuredImage: post?.featuredImage || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  async function submit(data) {
    setIsUploading(true);
    let compressedBlob = null;
    let compressedFile = null;
    if (data.image[0]) {
      compressedBlob = await imageCompression(data.image[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      compressedFile = new File([compressedBlob], data.image[0].name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });
    }

    if (post) {
      const uploadedFile = compressedFile
        ? await databaseService.uploadFile(compressedFile)
        : null;

      if (uploadedFile) {
        await databaseService.deleteFile(post.featuredImage);
      }

      delete data.image; // deleting unnecessary  image[] array (fileInput)
      const updatedPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: uploadedFile ? uploadedFile.$id : post.featuredImage,
      });

      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      //* for a new post

      const uploadedFile = compressedFile
        ? await databaseService.uploadFile(compressedFile)
        : null;

      if (uploadedFile) {
        data.featuredImage = uploadedFile.$id;
      }

      const createdPost = await databaseService.createPost({
        ...data,
        userId: userData.$id,
      });
      if (createdPost) {
        navigate(`/post/${createdPost.$id}`);
      }
    }
    setIsUploading(false);
  }

  function handleAvatarPreview(e) {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }
  async function deletePost() {
    await databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.feturedImage);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap justify-center w-full px-2  "
    >
      <div className="w-full flex justify-end mb-3 gap-2 ">
        <Link to="/my-posts">
          <button className="duration-100 px-2 rounded-full hover:underline hover:bg-gray-200 text-gray-600">
            Cancel
          </button>
        </Link>
        {post && (
          <Link onClick={deletePost} to="/my-posts">
            <button className="duration-100 px-2 rounded-full hover:underline hover:bg-red-200 text-red-500">
              Delete
            </button>
          </Link>
        )}
      </div>
      <ul className="lg:flex gap-4 lg:w-full  ">
        <li className=" order-2 lg:mt-7">
          <input
            label="Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
            onChange={handleAvatarPreview}
            className="block p-2 text-sm  w-full text-white bg-blue-600 rounded-lg cursor-pointer focus:outline-none file:hidden  active:bg-blue-700"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' /%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 0.75rem center",
              backgroundSize: "1.25rem",
              paddingLeft: "2.5rem",
            }}
            placeholder="Upload Post Image"
          />
          <div className="p-0.5 my-2 flex justify-center  w-full">
            {imagePreview ? (
              <img
                src={imagePreview}
                className=" max-w-full  max-h-[25vh] object-contain rounded-sm  outline-slate-300"
                alt="Post image"
              />
            ) : post ? (
              <img
                src={databaseService.getFilePreview(post.featuredImage)}
                className=" max-w-full max-h-[25vh] object-cover rounded-sm outline outline-slate-700"
                alt={post.title}
              />
            ) : (
              <div className="flex items-center">
                <svg
                  className="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#6a7282"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Zm140-360q25 0 42.5-17.5T400-620q0-25-17.5-42.5T340-680q-25 0-42.5 17.5T280-620q0 25 17.5 42.5T340-560Z" />
                </svg>
                <h1 className="ml-2 text-gray-600"> Select an image</h1>
              </div>
            )}
          </div>
          <div className="hidden lg:flex lg:items-end lg:gap-2">
            <Select
              //! ref issue might happen in the component
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={isUploading ? "bg-blue-800" : "bg-blue-600"}
              className="w-full mt-4 lg:mt-0"
              disabled={isUploading}
            >
              {post
                ? isUploading
                  ? "Updating..."
                  : "Update"
                : isUploading
                ? "Submitting..."
                : "Submit"}
            </Button>
          </div>
        </li>
        <li className=" grow ">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </li>

        <li className="mt-2 lg:hidden ">
          <Select
            //! ref issue might happen in the component
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={isUploading ? "bg-blue-800" : "bg-blue-600"}
            className="w-full mt-4 lg:mt-0"
            disabled={isUploading}
          >
            {post
              ? isUploading
                ? "Updating..."
                : "Update"
              : isUploading
              ? "Submitting..."
              : "Submit"}
          </Button>
        </li>
      </ul>
      {isUploading ? <Loading /> : null}
    </form>
  );
}

export default PostForm;
