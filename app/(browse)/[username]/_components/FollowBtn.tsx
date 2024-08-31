"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { followUser, unFollowUser } from "@/lib/actions/follow";

type Props = {
  userid: string;
  isFollowing: boolean;
};

const FollowBtn = ({ userid, isFollowing }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      if (isFollowing) {
        unFollowUser(userid)
          .then(() => {
            toast.success("You have now unfollowed this user");
          })
          .catch((err) => {
            toast.error("Something went wrong! Failed to unfollow user");
          });
      } else {
        followUser(userid)
          .then(() => {
            toast.success("You are now following this user");
          })
          .catch((err) => {
            toast.error("Something went wrong! Failed to follow user");
          });
      }
    });
  };

  return (
    <Button
      className="disabled:cursor-not-allowed disabled:opacity-60"
      variant={isFollowing ? "destructive" : "primary"}
      disabled={isPending}
      onClick={onClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
