import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/auth";
import StreamPlayer from "@/components/stream-player";
import { getStreamByUserId } from "@/lib/data/stream";

export default async function UPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.username !== username) {
    return redirect("/");
  }

  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="h-full w-full">
      <StreamPlayer user={currentUser} stream={stream} isFollowing />
    </div>
  );
}
