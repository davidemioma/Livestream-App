"use client";

import React from "react";
import { cn } from "@/lib/utils";
import useCreatorSidebar from "@/hooks/use-creator-sidebar";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { collapsed } = useCreatorSidebar();

  return (
    <aside
      className={cn(
        "scrollbar-hide fixed left-0 z-50 h-[calc(100vh-80px)] overflow-y-scroll border-r border-t bg-background pb-5 transition-all duration-300 dark:border-[#2d2e35] dark:bg-[#252731]",
        collapsed ? "w-[70px]" : "w-[70px] lg:w-60",
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
