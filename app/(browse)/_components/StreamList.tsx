"use client";

import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import StreamCard, { StreamCardSkeleton } from "./StreamCard";
import { NUMBEROFSTREAMS, StreamProps } from "@/lib/data/stream";
import useUnlimitedScrolling from "@/hooks/use-unlimited-scrolling";

type Props = {
  userId?: string;
  initialStreams: StreamProps[];
};

const StreamList = ({ userId, initialStreams }: Props) => {
  const {
    ref,
    entry,
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useUnlimitedScrolling({
    key: "feed-products",
    query: `/api/streams?userId=${userId}&limit=${NUMBEROFSTREAMS}`,
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
    return <StreamListSkeleton />;
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
            <StreamCard stream={stream} />
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
          Could not get products! Try refreshing the page.
        </div>
      )}
    </div>
  );
};

export const StreamListSkeleton = () => {
  return (
    <div className="mx-auto h-full w-full max-w-screen-2xl p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <StreamCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default StreamList;
