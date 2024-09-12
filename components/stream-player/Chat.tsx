"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ChatCommunity from "./ChatCommunity";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import ChatList, { ChatListSkeleton } from "./ChatList";
import ChatForm, { ChatFormSkeleton } from "./ChatForm";
import ChatHeader, { ChatHeaderSkeleton } from "./ChatHeader";
import useChatSidebar, { ChatVariant } from "@/hooks/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

type Props = {
  viewerName: string;
  hostname: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isFollowersOnly: boolean;
};

const Chat = ({
  viewerName,
  hostname,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isFollowersOnly,
}: Props) => {
  const [value, setValue] = useState("");

  const matches = useMediaQuery("(max-width: 1024px)");

  const { variant, onExpand } = useChatSidebar();

  const connectionState = useConnectionState();

  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const { chatMessages, send } = useChat();

  const reversedMessages = useMemo(() => {
    return chatMessages.sort((a, b) => b.timestamp - a.timestamp);
  }, [chatMessages]);

  const handleSubmit = async () => {
    if (!send || !value.trim()) return;

    try {
      await send(value);
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setValue("");
    }
  };

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col overflow-y-scroll border-y border-l bg-white scrollbar-hide dark:border-[#2d2e35] dark:bg-[#252731]">
      <ChatHeader />

      <div className="flex-1 p-3">
        <ChatList messages={reversedMessages} isHidden={isHidden} />
      </div>

      {variant === ChatVariant.CHAT ? (
        <>
          <ChatForm
            value={value}
            onChange={(value: string) => setValue(value)}
            isHidden={isHidden}
            isFollowing={isFollowing}
            isDelayed={isChatDelayed}
            isFollowersOnly={isFollowersOnly}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <>
          <ChatCommunity viewerName={viewerName} hostName={hostname} />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col border-y border-l bg-white dark:border-[#2d2e35] dark:bg-[#252731]">
      <ChatHeaderSkeleton />

      <ChatListSkeleton />

      <ChatFormSkeleton />
    </div>
  );
};

export default Chat;
