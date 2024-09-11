import React from "react";
import { cn } from "@/lib/utils";
import LiveBadge from "./LiveBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const avatarSize = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
      xl: "w-20 h-20",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props extends VariantProps<typeof avatarSize> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

interface AvatarSkeletonProps extends VariantProps<typeof avatarSize> {}

const UserAvatar = ({ imageUrl, username, isLive, showBadge, size }: Props) => {
  const canShowBadge = isLive && showBadge;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "border border-background ring-2 ring-rose-500",
          avatarSize({ size }),
        )}
      >
        <AvatarImage className="object-cover" src={imageUrl} />

        <AvatarFallback>
          {username[0].toUpperCase()}
          {username[username.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {canShowBadge && (
        <div className="absolute -bottom-4 left-3">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const UserAvatarSkeleton = ({ size }: AvatarSkeletonProps) => {
  return (
    <Skeleton
      className={cn("rounded-full", avatarSize({ size }))}
      isBackground
    />
  );
};

export default UserAvatar;
