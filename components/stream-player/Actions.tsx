"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { followUser, unFollowUser } from "@/lib/actions/follow";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
};

const Actions = ({ isFollowing, hostIdentity, isHost }: Props) => {
  const router = useRouter();

  const { userId } = useAuth();

  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!userId) {
      router.push("/sign-in");
    }

    if (isHost) return;

    const successMessage = `You ${isFollowing ? "unfollowed" : "followed"} user`;

    const errMessage = `Failed to ${isFollowing ? "unfollow" : "follow"} user`;

    startTransition(() => {
      if (isFollowing) {
        unFollowUser(hostIdentity)
          .then(() => {
            toast.success(successMessage);
          })
          .catch((err) => {
            toast.error(errMessage);
          });
      } else {
        followUser(hostIdentity)
          .then(() => {
            toast.success(successMessage);
          })
          .catch((err) => {
            toast.error(errMessage);
          });
      }
    });
  };

  if (isHost) return null;

  return (
    <Button
      className="w-full lg:w-auto"
      variant={isFollowing ? "destructive" : "primary"}
      size="sm"
      disabled={isPending}
      onClick={handleClick}
    >
      <Heart
        className={cn("mr-2 h-4 w-4", isFollowing ? "fill-white" : "fill-none")}
      />

      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" isBackground />;
};

export default Actions;
