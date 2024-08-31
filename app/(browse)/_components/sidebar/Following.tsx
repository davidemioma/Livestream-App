"use client";

import React from "react";
import UserItem, { UserItemSkeleton } from "./UserItem";
import { User } from "@prisma/client";
import useSidebar from "@/hooks/use-sidebar";

type Props = {
  data: {
    id: string;
    following: {
      id: string;
      username: string;
      imageUrl: string | null;
    };
  }[];
};

const Following = ({ data }: Props) => {
  const { collapsed } = useSidebar();

  return (
    <div>
      {!collapsed && (
        <div className="mb-3 pl-6">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((item) => (
          <UserItem key={item.id} user={item.following as User} />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="space-y-2 px-2">
      {new Array(5).fill("").map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};

export default Following;
