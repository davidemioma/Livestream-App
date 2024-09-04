import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";
import UrlCard from "./_components/UrlCard";
import KeyCard from "./_components/KeyCard";
import { getCurrentUser } from "@/lib/data/auth";
import ConnectModal from "./_components/ConnectModal";

export default async function UKeysPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const stream = await prismadb.stream.findUnique({
    where: {
      userId: currentUser.id,
    },
    select: {
      serverUrl: true,
      streamKey: true,
    },
  });

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>

        <ConnectModal />
      </div>

      <div className="space-y-4">
        <UrlCard serverUrl={stream.serverUrl} />

        <KeyCard streamKey={stream.streamKey} />
      </div>
    </div>
  );
}
