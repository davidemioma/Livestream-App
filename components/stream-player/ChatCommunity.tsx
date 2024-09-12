"use client";

import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import CommunityItem from "./CommunityItem";
import useDebounce from "@/hooks/use-debounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type Props = {
  viewerName: string;
  hostName: string;
};

const ChatCommunity = ({ viewerName, hostName }: Props) => {
  const participants = useParticipants();

  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce(value, 500);

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;

        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }

        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    );

    return deduped.filter((participant) =>
      participant?.name?.toLowerCase().includes(debouncedValue.toLowerCase()),
    );
  }, [participants, debouncedValue]);

  // if (isHidden) {
  //   return (
  //     <div className="flex h-[25%] items-center justify-center border-t">
  //       <p className="text-sm text-muted-foreground">Community is disabled</p>
  //     </div>
  //   );
  // }

  return (
    <div className="border-t p-4 dark:border-white/10">
      <Input
        className="dark:border-white/10"
        placeholder="Search Community"
        onChange={(e) => setValue(e.target.value)}
      />

      <ScrollArea className="mt-3 h-[200px] space-y-2">
        <p className="hidden p-2 text-center text-sm text-muted-foreground last:block">
          No results found
        </p>

        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostname={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
