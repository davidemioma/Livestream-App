import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/ToggleCard";

const Loading = () => {
  return (
    <div className="p-6">
      <Skeleton className="mb-4 h-10 w-[200px]" />

      <div className="space-y-4">
        <ToggleCardSkeleton />

        <ToggleCardSkeleton />

        <ToggleCardSkeleton />
      </div>
    </div>
  );
};

export default Loading;
