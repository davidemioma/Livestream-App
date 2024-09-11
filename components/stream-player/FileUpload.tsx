"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import CustomToolTip from "../CustomToolTip";
import { UploadDropzone } from "@/lib/uploadthing";

type Props = {
  value?: string;
  onChange: (url?: string) => void;
  disabled: boolean;
};

const FileUpload = ({ value, onChange, disabled }: Props) => {
  if (value)
    return (
      <>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border dark:border-white/10">
          <Image
            className="object-cover"
            src={value}
            fill
            alt="uploaded image"
          />
        </div>

        <div className="absolute right-2 top-2 z-10">
          <CustomToolTip asChild label="Remove Thummbnail" side="left">
            <Button
              className="h-auto w-auto p-1.5"
              type="button"
              disabled={disabled}
              onClick={() => onChange("")}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </CustomToolTip>
        </div>
      </>
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
        disabled={disabled}
      />
    </div>
  );
};

export default FileUpload;
