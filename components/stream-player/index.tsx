"use client";

import React from "react";
import Video from "./Video";
import { User, Stream } from "@prisma/client";
import useViewerToken from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";

type Props = {
  user: User;
  stream: Stream;
  isFollowing: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
  // const { token, identity, name } = useViewerToken("");

  // if (!token || !identity || !name) {
  //   return <div>Cannot watch stream</div>;
  // }

  return (
    <LiveKitRoom
      className="grid h-full w-full lg:grid-cols-3 2xl:grid-cols-6"
      token={""}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
    >
      <div className="w-full pb-10 scrollbar-hide lg:col-span-2 lg:overflow-y-auto 2xl:col-span-5">
        <Video hostname={user.username} hostIdentity={user.id} />
      </div>
    </LiveKitRoom>
  );
};

export default StreamPlayer;
