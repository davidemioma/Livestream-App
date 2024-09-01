"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import useCreatorSidebar from "@/hooks/use-creator-sidebar";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const matches = useMediaQuery("(max-width: 1024px)");

  const { collapsed, onCollapse, onExpand } = useCreatorSidebar();

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

export default Container;
