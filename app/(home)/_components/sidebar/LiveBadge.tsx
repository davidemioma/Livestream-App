import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const LiveBadge = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "rounded-md border border-background bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white",
        className,
      )}
    >
      Live
    </div>
  );
};

export default LiveBadge;
