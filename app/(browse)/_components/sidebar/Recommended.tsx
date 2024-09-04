"use client";

import React from "react";
import { User } from "@prisma/client";
import useSidebar from "@/hooks/use-sidebar";
import UserItem, { UserItemSkeleton } from "./UserItem";

type Props = {
  recommended: (User & { stream: { isLive: boolean } | null })[];
};

const Recommended = ({ recommended }: Props) => {
  const { collapsed } = useSidebar();

  return (
    <div>
      {!collapsed && (
        <div className="mb-3 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {recommended.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="space-y-2 px-2">
      {new Array(5).fill("").map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};

export default Recommended;
