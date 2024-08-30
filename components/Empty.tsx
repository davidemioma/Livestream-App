"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";
import useSidebar from "@/hooks/use-sidebar";

type Props = {
  className?: string;
  sidebar?: boolean;
};

const Empty = ({ className, sidebar }: Props) => {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-2 py-4",
        className,
      )}
    >
      <Clapperboard className="h-10 w-10" />

      <span
        className={cn(
          "text-sm font-semibold text-muted-foreground",
          sidebar && collapsed ? "hidden" : "hidden lg:block",
        )}
      >
        No recommended users.
      </span>
    </div>
  );
};

export default Empty;
