import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { StreamProps } from "@/lib/data/stream";
import { Skeleton } from "@/components/ui/skeleton";
import VerifiedMark from "@/components/VerifiedMark";
import Thumbnail, { ThumbnailSkeleton } from "../../_components/Thumbnail";

type Props = {
  stream: StreamProps;
};

const ResultCard = ({ stream }: Props) => {
  return (
    <Link href={`/${stream.user.username}`}>
      <div className="flex w-full gap-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={stream.thumbnailUrl}
            fallback={stream.user.imageUrl}
            isLive={stream.isLive}
            username={stream.user.username}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="cursor-pointer text-lg font-bold hover:text-blue-500">
              {stream.user.username}
            </p>

            <VerifiedMark />
          </div>

          <p className="text-sm text-muted-foreground">{stream.name}</p>

          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(stream.updatedAt, {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-32" isBackground />

        <Skeleton className="h-3 w-24" isBackground />

        <Skeleton className="h-3 w-12" isBackground />
      </div>
    </div>
  );
};

export default ResultCard;
