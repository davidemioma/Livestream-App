import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { TvMinimalPlay } from "lucide-react";

const font = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 transition hover:opacity-75">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#252731] text-white dark:bg-white dark:text-black md:h-10 md:w-10">
          <TvMinimalPlay className="h-5 w-5 md:h-6 md:w-6" />
        </div>

        <div className="hidden flex-col sm:flex">
          <span className={cn(font.className, "text-lg font-semibold")}>
            LiveStream
          </span>

          <span className="text-xs text-muted-foreground">
            Creator Dashboard
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
