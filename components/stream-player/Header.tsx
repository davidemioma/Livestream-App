"use client";

import React from "react";
import { UserIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import VerifiedMark from "../VerifiedMark";
import Actions, { ActionsSkeleton } from "./Actions";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import UserAvatar, {
  UserAvatarSkeleton,
} from "@/app/(browse)/_components/sidebar/UserAvatar";

type Props = {
  name: string;
  hostIdentity: string;
  hostname: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
};

const Header = ({
  name,
  hostIdentity,
  hostname,
  viewerIdentity,
  imageUrl,
  isFollowing,
}: Props) => {
  const participants = useParticipants();

  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;

  const paricipantCount = participants.length - 1;

  const isHost = `host-${hostIdentity}` === viewerIdentity;

  return (
    <div className="flex flex-col items-start justify-between gap-4 p-4 lg:flex-row lg:gap-0">
      <div className="flex items-center gap-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={name}
          size="lg"
          isLive={isLive}
          showBadge
        />

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{hostname}</h2>

            <VerifiedMark />
          </div>

          <span className="text-sm font-semibold text-muted-foreground">
            {name}
          </span>

          {isLive ? (
            <div className="flex items-center gap-1 text-sm text-rose-500">
              <UserIcon className="h-4 w-4" />

              <p>
                {paricipantCount} {paricipantCount === 1 ? "Viewer" : "Viewers"}
              </p>
            </div>
          ) : (
            <div className="text-xs font-semibold text-muted-foreground">
              Offline
            </div>
          )}
        </div>
      </div>

      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 p-4 lg:flex-row lg:gap-0">
      <div className="flex items-center gap-3">
        <UserAvatarSkeleton size="lg" />

        <div className="space-y-2">
          <Skeleton className="h-6 w-32" isBackground />

          <Skeleton className="h-4 w-24" isBackground />
        </div>
      </div>

      <ActionsSkeleton />
    </div>
  );
};

export default Header;
