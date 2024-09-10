import React, { useMemo } from "react";
import CustomToolTip from "../CustomToolTip";
import { Info } from "lucide-react";

type Props = {
  isDelayed: boolean;
  isFollowersOnly: boolean;
};

const ChatInfo = ({ isFollowersOnly, isDelayed }: Props) => {
  const hint = useMemo(() => {
    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 sec.";
    }

    if (isFollowersOnly && !isDelayed) {
      return "Only followers can chat";
    }

    if (isFollowersOnly && isDelayed) {
      return "Followers only and messages are delayed by 3 sec.";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isDelayed && !isFollowersOnly) {
      return "Slow mode";
    }

    if (isFollowersOnly && !isDelayed) {
      return "Followers only";
    }

    if (isFollowersOnly && isDelayed) {
      return "Followers only and slow mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) return null;

  return (
    <div className="flex w-full items-center gap-2 rounded-t-md border bg-gray-100 p-2 text-muted-foreground dark:border-white/10 dark:bg-white/5">
      <CustomToolTip label={hint}>
        <Info className="h-4 w-4" />
      </CustomToolTip>

      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
};

export default ChatInfo;
