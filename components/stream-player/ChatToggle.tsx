"use client";

import React from "react";
import { Button } from "../ui/button";
import CustomToolTip from "../CustomToolTip";
import useChatSidebar from "@/hooks/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar();

  const label = collapsed ? "Expand" : "Collapse";

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const toggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  return (
    <CustomToolTip asChild label={label}>
      <Button
        className="h-auto bg-transparent p-2 hover:bg-gray-100 hover:text-primary hover:dark:bg-white/10"
        variant="ghost"
        onClick={toggle}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </CustomToolTip>
  );
};

export default ChatToggle;
