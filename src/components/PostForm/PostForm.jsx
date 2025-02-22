import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import databaseService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RTE, Input, Select, Button, Loading } from "../index";
import imageCompression from "browser-image-compression";

function PostForm({ post }) {
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
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
    }
    setIsUploading(false);
    navigate("/");
  }

  function slugMaker(value) {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z\d]+/g, "_");
    }
    return "";
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugMaker(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch.title, slugMaker, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
          //!something is wrong
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
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
          className="w-full"
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
        {isUploading ? <Loading /> : null}
      </div>
    </form>
  );
}

export default PostForm;
