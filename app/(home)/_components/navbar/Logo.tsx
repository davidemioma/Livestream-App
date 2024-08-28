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
      <div className="hidden items-center gap-2 transition hover:opacity-75 md:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252731] text-white dark:bg-white dark:text-black">
          <TvMinimalPlay className="h-6 w-6" />
        </div>

        <span className={cn(font.className, "text-lg font-semibold")}>
          LiveStream
        </span>
      </div>
    </Link>
  );
};

export default Logo;
