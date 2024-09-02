import { redirect } from "next/navigation";
import ToggleCard from "./_components/ToggleCard";
import { getStreamByUserId } from "@/lib/data/stream";
import { getCurrentUserByUsername } from "@/lib/data/auth";

export default async function UChatPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const currentUser = await getCurrentUserByUsername(username);

  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Chat Settings</h1>

      <div className="space-y-4">
        <ToggleCard
          label="Enable Chat"
          value={stream.isChatEnabled}
          field="isChatEnabled"
        />

        <ToggleCard
          label="Delay Chat"
          value={stream.isChatDelayed}
          field="isChatDelayed"
        />

        <ToggleCard
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
          field="isChatFollowersOnly"
        />
      </div>
    </div>
  );
}
