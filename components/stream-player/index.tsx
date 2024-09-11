"use client";

import React from "react";
import { cn } from "@/lib/utils";
import ChatToggle from "./ChatToggle";
import Chat, { ChatSkeleton } from "./Chat";
import { User, Stream } from "@prisma/client";
import Video, { VideoSkeleton } from "./Video";
import Header, { HeaderSkeleton } from "./Header";
import useChatSidebar from "@/hooks/use-chat-sidebar";
import useViewerToken from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";

type Props = {
  user: User;
  stream: Stream;
  isFollowing: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
  const { collapsed } = useChatSidebar();

  const { token, identity, name } = useViewerToken(user.id);

  if (!token || !identity || !name) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="fixed right-5 top-[100px] z-50">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        className={cn(
          "grid h-full w-full lg:grid-cols-3 2xl:grid-cols-6",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
      >
        <div className="w-full pb-10 scrollbar-hide lg:col-span-2 lg:overflow-y-auto 2xl:col-span-5">
          <Video hostname={user.username} hostIdentity={user.id} />

          <Header
            name={stream.name}
            hostIdentity={user.id}
            hostname={user.username}
            viewerIdentity={identity}
            imageUrl={user.imageUrl || "/no-profile.jpeg"}
            isFollowing={isFollowing}
          />
        </div>

        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostname={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid h-full w-full lg:grid-cols-3 lg:gap-y-0 2xl:grid-cols-6">
      <div className="w-full space-y-4 pb-10 scrollbar-hide lg:col-span-2 lg:overflow-y-auto 2xl:col-span-5">
        <VideoSkeleton />

        <HeaderSkeleton />
      </div>

      <div className="col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  );
};

export default StreamPlayer;
