import React from "react";
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import CustomToolTip from "@/components/CustomToolTip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="ml-4 flex items-center gap-3 md:gap-4 lg:ml-0">
      {!user && (
        <Link href="/sign-in">
          <Button size="sm" variant="primary">
            Sign In
          </Button>
        </Link>
      )}

      {user && <UserButton afterSignOutUrl="/" />}

      {user && (
        <CustomToolTip label="Dashboard" asChild side="bottom" align="center">
          <Link
            href={`/u/${user.username}`}
            className="flex items-center gap-2"
          >
            <Clapperboard className="h-5 w-5 text-muted-foreground" />

            <span className="hidden text-sm font-medium lg:block">
              Dashboard
            </span>
          </Link>
        </CustomToolTip>
      )}

      <ThemeToggle />
    </div>
  );
};

export default Actions;
