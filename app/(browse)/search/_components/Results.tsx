"use client";

import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { StreamProps } from "@/lib/data/stream";
import { NUMBEROFSEARCHRESULTS } from "@/lib/data/search";
import useUnlimitedScrolling from "@/hooks/use-unlimited-scrolling";

type Props = {
  term: string;
  userId?: string;
  initialStreams: StreamProps[];
};

const Results = ({ term, initialStreams, userId }: Props) => {
  const {
    ref,
    entry,
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useUnlimitedScrolling({
    key: "search-streams",
    query: `/api/streams/search?userId=${userId}&limit=${NUMBEROFSEARCHRESULTS}&term=${term}`,
    initialData: initialStreams,
  });

  //@ts-ignore
  const streams: StreamProps[] =
    data?.pages?.flatMap((page) => page) ?? initialStreams;

  //When you scroll to the bottom it triggers the fetchNextPage() to fetch more products
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (streams.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No streams found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {streams.map((stream, index) => (
          <div key={stream.id} ref={index === streams.length - 1 ? ref : null}>
            <div>{stream.name}</div>
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
        </div>
      )}

      {error && (
        <div className="text-center text-sm font-medium text-muted-foreground">
          Could not get streams! Try refreshing the page.
        </div>
      )}
    </div>
  );
};

export const ResultsSkeleton = () => {
  return <div>ResultsSkeleton</div>;
};

export default Results;
