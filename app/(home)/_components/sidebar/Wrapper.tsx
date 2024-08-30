"use client";

import React from "react";
import { cn } from "@/lib/utils";
import useSidebar from "@/hooks/use-sidebar";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 z-50 h-full border-r border-t bg-background transition-all duration-300 dark:border-[#2d2e35] dark:bg-[#252731]",
        collapsed ? "w-[70px]" : "w-[70px] lg:w-60",
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
