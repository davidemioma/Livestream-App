import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/auth";
import ToggleCard from "./_components/ToggleCard";

export default async function UChatPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const stream = await prismadb.stream.findUnique({
    where: {
      userId: currentUser.id,
    },
    select: {
      isChatEnabled: true,
      isChatDelayed: true,
      isChatFollowersOnly: true,
    },
  });

  if (!stream) {
    throw new Error("Stream not found");
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
          label="Followers Only Chat"
          value={stream.isChatFollowersOnly}
          field="isChatFollowersOnly"
        />
      </div>
    </div>
  );
}
