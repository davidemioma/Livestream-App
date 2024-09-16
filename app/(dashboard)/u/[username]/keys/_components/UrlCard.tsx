import React from "react";
import CopyBtn from "@/components/CopyBtn";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  serverUrl: string | null;
};

const UrlCard = ({ serverUrl }: Props) => {
  return (
    <Card className="bg-white dark:bg-[#252731]">
      <CardHeader>
        <CardTitle>Server URL</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-2">
        <Input value={serverUrl || ""} placeholder="Server URL" disabled />

        <CopyBtn value={serverUrl || ""} />
      </CardContent>
    </Card>
  );
};

export const UrlCardSkeleton = () => {
  return (
    <Card className="bg-white dark:bg-[#252731]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-2">
        <Skeleton className="h-8 flex-1" />

        <Skeleton className="h-8 w-8" />
      </CardContent>
    </Card>
  );
};

export default UrlCard;
