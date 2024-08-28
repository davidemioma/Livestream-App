import React from "react";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { TvMinimalPlay } from "lucide-react";

const font = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <TvMinimalPlay className="h-16 w-16" />

      <span className={cn("text-lg font-semibold", font.className)}>
        LiveStream
      </span>
    </div>
  );
};

export default Logo;
