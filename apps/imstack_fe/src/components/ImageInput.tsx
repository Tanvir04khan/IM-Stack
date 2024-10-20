import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react"; // Importing the icon from Lucide
import { Label } from "./ui/label";

type CircularImageUploadPropsType = {
  value: string | null;
  setImage: (value: string | null) => void;
  lable: string;
};

const CircularImageUpload = ({
  lable,
  setImage,
  value,
}: CircularImageUploadPropsType) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set the selected image to the state
    }
  };

  return (
    <div className="w-max-content flex flex-col items-center">
      {/* Circle Container for the Image or Icon */}
      <label
        htmlFor="imageUpload"
        className="flex flex-col items-center justify-center gap-2 relative cursor-pointer"
      >
        <div className="w-20 h-20 rounded-full border border-gray-300 flex justify-center items-center overflow-hidden">
          {value ? (
            <img
              src={value}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-500" />
          )}
        </div>
        <Label>{lable}</Label>
      </label>

      {/* Hidden input for uploading image */}
      <Input
        type="file"
        accept="image/*"
        id="imageUpload"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Optionally, you can add a button to clear the image */}
      {value && (
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setImage(null)}
        >
          Remove Image
        </Button>
      )}
    </div>
  );
};

export default CircularImageUpload;
