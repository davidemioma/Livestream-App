"use client";

import React from "react";
import CustomToolTip from "../CustomToolTip";
import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";

type Props = {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggle: () => void;
};

const VolumeControl = ({ volume, onVolumeChange, onToggle }: Props) => {
  const isMuted = volume === 0;

  const isAboveHalf = volume > 50;

  const label = isMuted ? "Unmute" : "Mute";

  const Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;

  return (
    <div className="flex items-center gap-2">
      <CustomToolTip asChild label={label}>
        <button
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
          onClick={onToggle}
        >
          <Icon className="h-6 w-6" />
        </button>
      </CustomToolTip>

      <Slider
        className="w-[8rem] cursor-pointer"
        value={[volume]}
        onValueChange={(value) => onVolumeChange(value[0])}
        max={100}
        min={0}
        step={1}
      />
    </div>
  );
};

export default VolumeControl;
