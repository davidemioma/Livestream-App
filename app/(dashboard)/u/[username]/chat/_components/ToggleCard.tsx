"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { updateStream } from "@/lib/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  label: string;
  value: boolean;
  field: "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
};

const ToggleCard = ({ label, value = false, field }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success("Settings updated");
        })
        .catch((err) => {
          toast.error("Something went wrong! Failed to update settings");
        });
    });
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-white p-5 dark:bg-[#252731]">
      <p className="shrink-0 font-semibold">{label}</p>

      <div className="space-y-2">
        <Switch checked={value} onCheckedChange={onChange} disabled={isPending}>
          {value ? "On" : "Off"}
        </Switch>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-5 dark:bg-[#252731]">
      <Skeleton className="h-4 w-24" />

      <Skeleton className="h-10 w-10" />
    </div>
  );
};

export default ToggleCard;
