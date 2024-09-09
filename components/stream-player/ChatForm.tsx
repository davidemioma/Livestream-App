"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

interface ChatFormProps {
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isFollowersOnly: boolean;
  onSubmit: (value: string) => void;
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
  return (
    <form className="flex gap-3 p-3">
      <div className="w-full flex-1">
        <Input
          className={cn("dark:border-white/10")}
          placeholder="Send a message"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={false}
        />
      </div>

      <Button type="submit" variant="primary" disabled={false}>
        Chat
      </Button>
    </form>
  );
};

export default ChatForm;
