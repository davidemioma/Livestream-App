import React from "react";
import { WifiOff } from "lucide-react";

type Props = {
  username: string;
};

const OfflineVideo = ({ username }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <WifiOff className="h-10 w-10 text-muted-foreground" />

      <p className="text-muted-foreground">
        {username} is offline. Check back later.
      </p>
    </div>
  );
};

export default OfflineVideo;
