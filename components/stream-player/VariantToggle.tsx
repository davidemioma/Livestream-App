"use client";

import React from "react";
import { Button } from "../ui/button";
import CustomToolTip from "../CustomToolTip";
import { Users, MessageSquare } from "lucide-react";
import useChatSidebar, { ChatVariant } from "@/hooks/use-chat-sidebar";

const VariantToggle = () => {
  const { variant, onVariantChange } = useChatSidebar();

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const label = isChat ? "Community" : "Get back to chat";

  const toggle = () => {
    if (isChat) {
      onVariantChange(ChatVariant.COMMUNITY);
    } else {
      onVariantChange(ChatVariant.CHAT);
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

export default VariantToggle;
