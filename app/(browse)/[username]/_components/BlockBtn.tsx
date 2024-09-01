"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { blockOrUnblockUser } from "@/lib/actions/block";

type Props = {
  userid: string;
  isUserBlocked: boolean;
};

const BlockBtn = ({ userid, isUserBlocked }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      if (isUserBlocked) {
        blockOrUnblockUser({ id: userid, task: "unblock" })
          .then(() => {
            toast.success("You have now unblocked this user");
          })
          .catch((err) => {
            toast.error("Something went wrong! Failed to unblock user");
          });
      } else {
        blockOrUnblockUser({ id: userid, task: "block" })
          .then(() => {
            toast.success("You are now blocked this user");
          })
          .catch((err) => {
            toast.error("Something went wrong! Failed to block user");
          });
      }
    });
  };

  return (
    <Button
      className="disabled:cursor-not-allowed disabled:opacity-60"
      variant={isUserBlocked ? "outline" : "destructive"}
      disabled={isPending}
      onClick={onClick}
    >
      {isUserBlocked ? "Unblock" : "block"}
    </Button>
  );
};

export default BlockBtn;
