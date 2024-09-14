import { Suspense } from "react";
import { getStreams } from "@/lib/data/stream";
import { getCurrentUser } from "@/lib/data/auth";
import StreamList, { StreamListSkeleton } from "./_components/StreamList";

export default async function Home() {
  const currentUser = await getCurrentUser();

  const streams = await getStreams({ userId: currentUser?.id });

  return (
    <div className="mx-auto h-full w-full max-w-screen-2xl p-8">
      <h2 className="mb-4 text-lg font-semibold md:text-xl">
        Streams we think you&apos;ll like
      </h2>

      <Suspense fallback={<StreamListSkeleton />}>
        <StreamList initialStreams={streams} userId={currentUser?.id} />
      </Suspense>
    </div>
  );
}
