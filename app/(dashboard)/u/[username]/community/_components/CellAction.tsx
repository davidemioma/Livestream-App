"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { blockOrUnblockUser } from "@/lib/actions/block";
import { Button } from "@/components/ui/button";

type Props = {
  userId: string;
};

const CellAction = ({ userId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await blockOrUnblockUser({ task: "unblock", id: userId })
        .then(() => {
          toast.success("User unblocked");
        })
        .catch((err) => {
          toast.error("Failed to unblock user");
        });
    });
  };

  return (
    <Button
      className="text-blue-500"
      variant="link"
      size="sm"
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending ? "Loading..." : "Unblock"}
    </Button>
  );
};

export default CellAction;
