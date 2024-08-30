"use client";

import React from "react";
import { User } from "@prisma/client";
import useSidebar from "@/hooks/use-sidebar";
import UserItem, { UserItemSkeleton } from "./UserItem";

type Props = {
  recommended: User[];
};

const Recommended = ({ recommended }: Props) => {
  const { collapsed } = useSidebar();

  const showLabel = !collapsed;

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
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
      {new Array(6).fill("").map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};

export default Recommended;
