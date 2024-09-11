"use client";

import React from "react";
import LiveVideo from "./LiveVideo";
import OfflineVideo from "./OfflineVideo";
import LoadingVideo from "./LoadingVideo";
import { Skeleton } from "../ui/skeleton";
import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";

type Props = {
  hostname: string;
  hostIdentity: string;
};

const Video = ({ hostname, hostIdentity }: Props) => {
  const connectionState = useConnectionState();

  const participant = useRemoteParticipant(hostIdentity);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostname} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return (
    <div className="group relative aspect-video w-full border-b">{content}</div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video w-full border-x border-background">
      <Skeleton className="h-full w-full rounded-none" isBackground />
    </div>
  );
};

export default Video;
