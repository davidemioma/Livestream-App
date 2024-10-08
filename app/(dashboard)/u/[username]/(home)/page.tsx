import { redirect } from "next/navigation";
import StreamPlayer from "@/components/stream-player";
import { getStreamByUserId } from "@/lib/data/stream";
import { getCurrentUserWithFollowedBy } from "@/lib/data/auth";

export default async function UPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const currentUser = await getCurrentUserWithFollowedBy();

  if (!currentUser || currentUser.username !== username) {
    return redirect("/");
  }

  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="h-full w-full">
      <StreamPlayer
        user={currentUser}
        followedByCount={currentUser._count.followedBy}
        stream={stream}
        isFollowing
      />
    </div>
  );
}
