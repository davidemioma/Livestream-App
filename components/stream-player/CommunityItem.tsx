import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import CustomToolTip from "../CustomToolTip";
import { cn, stringToColor } from "@/lib/utils";
import { blockOrUnblockUser } from "@/lib/actions/block";

type Props = {
  hostname: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
};

const CommunityItem = ({
  hostname,
  viewerName,
  participantName,
  participantIdentity,
}: Props) => {
  const isHost = viewerName === hostname;

  const isSelf = participantName === viewerName;

  const color = stringToColor(participantName || "");

  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }

    startTransition(() => {
      blockOrUnblockUser({
        id: participantIdentity,
        task: "block",
      })
        .then(() => {
          toast.success(`Blocked ${participantName}`);
        })
        .catch((err) => {
          toast.error("Failed to block user");
        });
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      <span className="font-semibold" style={{ color }}>
        {participantName}
      </span>

      {isHost && !self && (
        <CustomToolTip label="Block User">
          <Button
            className="h-auto w-auto p-1 opacity-0 transition-opacity group-hover:opacity-100"
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </CustomToolTip>
      )}
    </div>
  );
};

export default CommunityItem;
