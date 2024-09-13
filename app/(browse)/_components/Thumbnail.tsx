import React from "react";
import Image from "next/image";
import LiveBadge from "./sidebar/LiveBadge";
import UserAvatar from "./sidebar/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  src: string | null;
  fallback: string | null;
  isLive: boolean;
  username: string;
};

const Thumbnail = ({ src, fallback, isLive, username }: Props) => {
  let content;

  if (!src) {
    content = (
      <div className="flex h-full w-full items-center justify-center rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 dark:bg-[#252731]">
        <UserAvatar
          size="lg"
          showBadge
          imageUrl={fallback || "no-profile.jpeg"}
          username={username}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        className="rounded-md object-cover transition-transform group-hover:translate-x-2 group-hover:translate-y-1"
        fill
        src={src}
        alt="Thumbnail"
      />
    );
  }

  return (
    <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-md">
      <div className="absolute inset-0 flex items-center justify-center bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />

      {content}

      {isLive && src && (
        <div className="absolute left-4 top-4">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group relative aspect-video cursor-pointer rounded-md">
      <Skeleton className="h-full w-full" isBackground />
    </div>
  );
};

export default Thumbnail;
