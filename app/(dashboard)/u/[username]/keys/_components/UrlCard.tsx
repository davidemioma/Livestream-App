import React from "react";
import CopyBtn from "@/components/CopyBtn";
import { Input } from "@/components/ui/input";
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

export default UrlCard;
