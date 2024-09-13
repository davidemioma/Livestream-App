import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/auth";
import { getSearchResults } from "@/lib/data/search";
import Results, { ResultsSkeleton } from "./_components/Results";

export default async function SearchPage({
  searchParams: { term },
}: {
  searchParams: { term: string };
}) {
  if (!term.trim()) {
    return redirect("/");
  }

  const currentUser = await getCurrentUser();

  const streams = await getSearchResults({ term, userId: currentUser?.id });

  return (
    <div className="mx-auto h-full w-full max-w-screen-2xl p-8">
      <h2 className="mb-4 text-lg font-semibold md:text-xl">
        Results for &quot;{term}&quot;
      </h2>

      <Suspense fallback={<ResultsSkeleton />}>
        <Results
          term={term}
          userId={currentUser?.id}
          initialStreams={streams}
        />
      </Suspense>
    </div>
  );
}
