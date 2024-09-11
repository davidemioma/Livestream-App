import React from "react";
import Image from "next/image";
import InfoModal from "./InfoModal";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
  name: string;
  thumbnail: string | null;
  hostIdentity: string;
  viewerIdentity: string;
};

const StreamInfo = ({
  name,
  thumbnail,
  hostIdentity,
  viewerIdentity,
}: Props) => {
  const isHost = `host-${hostIdentity}` === viewerIdentity;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="w-full rounded-xl bg-background dark:bg-[#252731]">
        <div className="flex items-center gap-2.5 p-4">
          <div className="flex items-center justify-center rounded-md bg-blue-600 p-2 text-white">
            <Pencil className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="'text-sm font-semibold capitalize lg:text-lg">
              Edit Stream
            </p>

            <p className="text-xs text-muted-foreground lg:text-sm">
              Maximise your visibility
            </p>
          </div>

          <InfoModal initialName={name} initialThumbnail={thumbnail} />
        </div>

        <Separator />

        <div className="space-y-4 p-4">
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">Name</h3>

            <p className="text-sm font-semibold">{name}</p>
          </div>

          {thumbnail && (
            <div className="space-y-1">
              <h3 className="text-sm text-muted-foreground">Thumbnail</h3>

              <div className="relative aspect-video w-[200px] overflow-hidden rounded-md border dark:border-white/10">
                <Image
                  className="object-cover"
                  fill
                  src={thumbnail}
                  alt={name}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamInfo;
