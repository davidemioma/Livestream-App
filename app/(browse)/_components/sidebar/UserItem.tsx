import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { User } from "@prisma/client";
import useSidebar from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  user: User & { stream: { isLive: boolean } | null };
};

const UserItem = ({ user }: Props) => {
  const { collapsed } = useSidebar();

  const isLive = user.stream?.isLive || false;

  return (
    <Button
      className={cn(
        "h-12 w-full",
        collapsed ? "justify-center" : "justify-start",
      )}
      variant="ghost"
    >
      <Link href={`/${user.username}`}>
        <div
          className={cn(
            "flex w-full items-center",
            collapsed && "justify-center",
            isLive ? "gap-4" : "gap-2",
          )}
        >
          <UserAvatar
            imageUrl={user.imageUrl || "/no-profile.jpeg"}
            username={user.username}
            isLive={isLive}
            showBadge={isLive}
          />

          {!collapsed && (
            <span className="w-[150px] truncate text-left font-semibold">
              {user.username}
            </span>
          )}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-4 px-3 py-2">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export default UserItem;
