import React from "react";
import Link from "next/link";
import { StreamProps } from "@/lib/data/stream";
import { Skeleton } from "@/components/ui/skeleton";
import Thumbnail, { ThumbnailSkeleton } from "./Thumbnail";
import UserAvatar, { UserAvatarSkeleton } from "./sidebar/UserAvatar";

type Props = {
  stream: StreamProps;
};

const StreamCard = ({ stream }: Props) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={stream.thumbnailUrl}
          fallback={stream.user.imageUrl}
          isLive={stream.isLive}
          username={stream.user.username}
        />

        <div className="flex items-end gap-3">
          <UserAvatar
            isLive={stream.isLive}
            imageUrl={stream.user.imageUrl || ""}
            username={stream.user.username}
          />

          <div className="flex flex-col gap-0.5 overflow-hidden">
            <p className="truncate text-sm font-semibold hover:text-blue-500">
              {stream.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {stream.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const StreamCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />

      <div className="flex items-end gap-3">
        <UserAvatarSkeleton />

        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-4 w-32" isBackground />

          <Skeleton className="h-3 w-24" isBackground />
        </div>
      </div>
    </div>
  );
};

export default StreamCard;
