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
        <div className="mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#252731] text-white dark:bg-white dark:text-black md:mr-0 md:h-10 md:w-10">
          <TvMinimalPlay className="h-5 w-5 md:h-6 md:w-6" />
        </div>

        <span
          className={cn(
            font.className,
            "hidden text-lg font-semibold md:inline-block",
          )}
        >
          LiveStream
        </span>
      </div>
    </Link>
  );
};

export default Logo;
