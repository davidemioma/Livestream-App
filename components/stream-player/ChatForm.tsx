"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ChatInfo from "./ChatInfo";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Input } from "@/components/ui/input";

interface ChatFormProps {
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isFollowersOnly: boolean;
  onSubmit: () => void;
}

const ChatForm = ({
  value,
  onChange,
  isHidden,
  isFollowing,
  isDelayed,
  isFollowersOnly,
  onSubmit,
}: ChatFormProps) => {
  const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

  const disabled =
    isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    e.stopPropagation();

    if (disabled || !value) return;

    if (isDelayed && !isDelayedBlocked) {
      setIsDelayedBlocked(true);

      setTimeout(() => {
        setIsDelayedBlocked(false);

        onSubmit();
      }, 300);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <div className="flex flex-col gap-2 p-3">
      <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />

      <form className="flex gap-3" onSubmit={handleSubmit}>
        <div className="w-full flex-1">
          <Input
            className={cn(
              "dark:border-white/10",
              isFollowersOnly && "rounded-t-none border-t-0",
            )}
            placeholder="Send a message"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>

        <Button type="submit" variant="primary" disabled={disabled}>
          Chat
        </Button>
      </form>
    </div>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex gap-3 p-3">
      <Skeleton className="h-8 w-full flex-1" />

      <Skeleton className="h-8 w-8" />
    </div>
  );
};

export default ChatForm;
