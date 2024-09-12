import React from "react";
import VerifiedMark from "../VerifiedMark";
import BioModal from "./BioModal";

type Props = {
  bio: string | null;
  hostIdentity: string;
  hostname: string;
  viewerIdentity: string;
  followedByCount: number;
};

const AboutCard = ({
  bio,
  hostIdentity,
  hostname,
  viewerIdentity,
  followedByCount,
}: Props) => {
  const isHost = viewerIdentity === `host-${hostIdentity}`;

  return (
    <div className="p-4">
      <div className="group flex w-full flex-col gap-3 rounded-xl bg-background p-4 dark:bg-[#252731]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold lg:text-lg">
            About {hostname}
            <VerifiedMark />
          </div>

          {isHost && <BioModal initialValue={bio} />}
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByCount > 1 ? "Followers" : "Follower"}
        </div>

        <p className="text-sm text-muted-foreground">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
