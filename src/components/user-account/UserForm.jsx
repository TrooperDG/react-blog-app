import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import databaseService from "../../appwrite/database";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails } from "../../store/userSlice";
import { Input, Button, Loading } from "../index";

function UserForm() {
  const [isUploading, setIsUploading] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: userDetails?.username || "",
      address: userDetails?.address || "",
      DOB: userDetails?.DOB || "",
      bio: userDetails?.bio || "",
      phone: userDetails?.phone || "",
      avatar: userDetails?.avatar || "user.svg",
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
        maxWidthOrHeight: 800,
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

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="px-10">
        <div className="w-full">
          //! need to make a live preview
          <Input
            label="Avatar :"
            placeholder="Avatar"
            className="mb-4"
            type="file"
            {...register("image")}
          />
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
