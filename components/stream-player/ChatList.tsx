import React from "react";
import ChatMessage from "./ChatMessage";
import { Skeleton } from "../ui/skeleton";
import { ReceivedChatMessage } from "@livekit/components-react";

type Props = {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};

const ChatList = ({ messages, isHidden }: Props) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col-reverse overflow-y-scroll scrollbar-hide">
      {messages.map((message) => (
        <ChatMessage key={message.id} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-3">
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default ChatList;
