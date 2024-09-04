"use client";

import React, { useRef } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";

type Props = {
  participant: Participant;
};

const LiveVideo = ({ participant }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative flex h-full w-full">
      <video ref={videoRef} width="100%" />
    </div>
  );
};

export default LiveVideo;
