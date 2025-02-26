import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import databaseService from "../../appwrite/database";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails } from "../../store/userSlice";
import { Input, Button, Loading } from "../index";

function UserForm({ userDetails }) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: userDetails?.username || "",
      address: userDetails?.address || "",
      DOB: userDetails?.DOB || "",
      bio: userDetails?.bio || "",
      phone: userDetails?.phone || "",
      avatar: userDetails?.avatar || "",
    },
  });
  const navigate = useNavigate();
  async function submit(data) {
    setIsUploading(true);
    let compressedBlob = null;
    let compressedFile = null;
    if (data.image[0]) {
      compressedBlob = await imageCompression(data.image[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      });
      compressedFile = new File([compressedBlob], data.image[0].name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });
    }

    const uploadedFile = compressedFile
      ? await databaseService.uploadFile(compressedFile)
      : null;
    if (uploadedFile) {
      if (userDetails) {
        if (userDetails.avatar)
          await databaseService.deleteFile(userDetails.avatar);
      }
      data.avatar = uploadedFile.$id;
    }

    const updatedUser = await databaseService.updateUser(userDetails.userId, {
      ...data,
    });

    if (updatedUser) {
      dispatch(addUserDetails(updatedUser));
      navigate("/my-account");
    }
    setIsUploading(false);
  }

  function handleAvatarPreview(e) {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="px-10">
        <div className="w-full flex flex-wrap items-center">
          <input
            type="file"
            {...register("image")}
            onChange={handleAvatarPreview}
            className="block p-2 text-sm text-white bg-blue-600 rounded-lg cursor-pointer focus:outline-none file:hidden  active:bg-blue-700"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' /%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 0.75rem center",
              backgroundSize: "1.25rem",
              paddingLeft: "2.5rem",
            }}
            placeholder="Upload Avatar"
          />
          <div className="p-2  rounded-full">
            <img
              className=" w-20 h-20 object-cover rounded-full outline-2 outline-slate-700"
              // src={imagePreview ? imagePreview : "user.svg"}
              src={
                imagePreview
                  ? imagePreview
                  : userDetails.avatar
                  ? databaseService.getFilePreview(userDetails.avatar)
                  : "user.svg"
              }
              alt=""
            />
          </div>
        </div>

        <Input
          label="Username :"
          placeholder="Username"
          className="mb-4"
          {...register("username")}
        />
        <Input
          label="Phone :"
          placeholder="Phone"
          className="mb-4"
          {...register("phone")}
        />
        <Input
          label="Date of birth :"
          placeholder="Date of birth "
          className="mb-4"
          type="date"
          {...register("DOB")}
        />
        <Input
          label="Bio Data :"
          placeholder="Bio Data"
          className="mb-4"
          {...register("bio")}
        />
        <Input
          label="Address :"
          placeholder="Address"
          className="mb-4"
          {...register("address")}
        />

        <Button
          type="submit"
          bgColor={isUploading ? "bg-blue-800" : "bg-blue-600"}
          className="w-full"
          disabled={isUploading}
        >
          {isUploading ? "Updating..." : "Update"}
        </Button>
        {isUploading ? <Loading /> : null}
      </div>
    </form>
  );
}

export default UserForm;
