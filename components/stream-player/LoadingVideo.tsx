import React from "react";
import { Loader } from "lucide-react";

type Props = {
  label: string;
};

const LoadingVideo = ({ label }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Loader className="h-10 w-10 animate-spin text-muted-foreground" />

      <p className="capitalize text-muted-foreground">{label}</p>
    </div>
  );
};

export default LoadingVideo;
