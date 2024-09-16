"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCreatorSidebar from "@/hooks/use-creator-sidebar";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

const Routes = () => {
  const { user } = useUser();

  const pathname = usePathname();

  const { collapsed } = useCreatorSidebar();

  const routes = [
    {
      name: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      name: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      name: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      name: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="flex flex-col gap-2 px-2 pt-4 lg:pt-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <Link
          className={cn(
            "h-12 w-full",
            pathname === route.href && "bg-accent",
            buttonVariants({ variant: "ghost" }),
          )}
          href={route.href}
          key={route.href}
        >
          <div
            className={cn(
              "flex w-full items-center gap-4",
              collapsed ? "justify-center" : "justify-start",
            )}
          >
            <route.icon className="h-4 w-4" />

            {!collapsed && <span>{route.name}</span>}
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default Routes;
