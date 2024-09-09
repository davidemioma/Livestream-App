"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import FullScreenControl from "./FullScreenControl";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import VolumeControl from "./VolumeControl";

type Props = {
  participant: Participant;
};

const LiveVideo = ({ participant }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const onVolumeChange = (value: number) => {
    setVolume(value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;

      videoRef.current.volume = value / 100;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;

      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();

      setIsFullScreen(false);
    } else if (wrapperRef.current) {
      wrapperRef.current?.requestFullscreen();

      setIsFullScreen(true);
    }
  };

  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex h-full w-full">
      <video ref={videoRef} className="object-contain" width="100%" />

      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            volume={volume}
            onVolumeChange={onVolumeChange}
            onToggle={toggleMute}
          />

          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
