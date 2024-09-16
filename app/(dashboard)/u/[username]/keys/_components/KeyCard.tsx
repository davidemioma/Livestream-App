"use client";

import React, { useState } from "react";
import CopyBtn from "@/components/CopyBtn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  streamKey: string | null;
};

const KeyCard = ({ streamKey }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <Card className="bg-white dark:bg-[#252731]">
      <CardHeader>
        <CardTitle>Stream Key</CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        <div className="flex items-center gap-2">
          <Input
            type={show ? "text" : "password"}
            value={streamKey || ""}
            placeholder="Stream Key"
            disabled
          />

          <Button
            size="sm"
            variant="ghost"
            disabled={!streamKey}
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>

          <CopyBtn value={streamKey || ""} />
        </div>
      </CardContent>
    </Card>
  );
};

export const KeyCardSkeleton = () => {
  return (
    <Card className="bg-white dark:bg-[#252731]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 flex-1" />

          <Skeleton className="h-8 w-8" />

          <Skeleton className="h-8 w-8" />
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyCard;
