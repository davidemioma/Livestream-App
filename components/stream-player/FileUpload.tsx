"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import CustomToolTip from "../CustomToolTip";
import { Loader2, Trash } from "lucide-react";
import { deleteFile } from "@/lib/actions/file";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateStream } from "@/lib/actions/stream";

type Props = {
  value?: string;
  onChange: (url?: string) => void;
  disabled: boolean;
  closeModal?: () => void;
};

const FileUpload = ({ value, onChange, disabled, closeModal }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!value) return;

    setIsDeleting(true);

    try {
      const result = await deleteFile(value);

      if (result.success) {
        onChange("");

        toast.success("Thumbnail removed successfully");

        closeModal && closeModal();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);

      toast.error("Failed to remove thumbnail");
    } finally {
      setIsDeleting(false);
    }
  };

  if (value)
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border dark:border-white/10">
        <Image className="object-cover" src={value} fill alt="uploaded image" />

        <div className="absolute right-2 top-2 z-10">
          <CustomToolTip asChild label="Remove Thummbnail" side="left">
            <Button
              className="h-auto w-auto p-1.5"
              type="button"
              disabled={disabled || isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </CustomToolTip>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint="thumbnailFileUpload"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error("Something went wrong! could not upload file.");

          console.log(error);
        }}
        disabled={disabled || isDeleting}
      />
    </div>
  );
};

export default FileUpload;
