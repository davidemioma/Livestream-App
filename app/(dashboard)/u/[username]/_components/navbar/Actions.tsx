import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ThemeToggle } from "@/components/ThemeToggle";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="ml-4 flex items-center gap-3 md:gap-4 lg:ml-0">
      <ThemeToggle />

      <UserButton signInUrl="/sign-in" />

      <Button
        className="p-2 text-muted-foreground hover:text-primary"
        variant="ghost"
        size="sm"
        asChild
      >
        <Link href="/">
          <LogOut className="mr-2 h-5 w-5" />
          Exit
        </Link>
      </Button>
    </div>
  );
};

export default Actions;
