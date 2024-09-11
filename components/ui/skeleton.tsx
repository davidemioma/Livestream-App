import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isBackground?: boolean;
};

function Skeleton({ className, isBackground, ...props }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        isBackground && "bg-white dark:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
