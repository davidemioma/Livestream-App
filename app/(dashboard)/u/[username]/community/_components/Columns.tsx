"use client";

import { format } from "date-fns";
import CellAction from "./CellAction";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import UserAvatar from "@/app/(browse)/_components/sidebar/UserAvatar";

export type BlockedUserProps = {
  id: string;
  userId: string;
  username: string;
  imageUrl: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<BlockedUserProps>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-4 pl-3">
        <UserAvatar
          imageUrl={row.original.imageUrl || "no-profile.jpeg"}
          username={row.original.username}
        />

        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4">{format(row.original.createdAt, "dd/MM/yyyy")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction userId={row.original.userId} />,
  },
];
