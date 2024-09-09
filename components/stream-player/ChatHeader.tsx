import React from "react";
import ChatToggle from "./ChatToggle";
import { Skeleton } from "../ui/skeleton";
import VariantToggle from "./VariantToggle";

const ChatHeader = () => {
  return (
    <div className="relative border-b p-3 dark:border-[#2d2e35]">
      <div className="absolute left-3 top-3 hidden lg:block">
        <ChatToggle />
      </div>

      <p className="text-center font-semibold text-primary">Chat</p>

      <div className="absolute right-3 top-3">
        <VariantToggle />
      </div>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative hidden border-b p-3 md:block">
      <Skeleton className="absolute left-3 top-3 h-6 w-6" />

      <Skeleton className="mx-auto h-6 w-28" />
    </div>
  );
};

export default ChatHeader;
