"use client";

import React from "react";
import CustomToolTip from "../CustomToolTip";
import { Minimize, Maximize } from "lucide-react";

type Props = {
  isFullScreen: boolean;
  onToggle: () => void;
};

const FullScreenControl = ({ isFullScreen, onToggle }: Props) => {
  const Icon = isFullScreen ? Minimize : Maximize;

  const label = isFullScreen ? "Exit Full Screen" : "Full Screen";

  return (
    <div className="flex items-center justify-center gap-4">
      <CustomToolTip asChild label={label}>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/70"
        >
          <Icon className="h-5 w-5" />
        </button>
      </CustomToolTip>
    </div>
  );
};

export default FullScreenControl;
