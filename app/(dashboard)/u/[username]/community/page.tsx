import { redirect } from "next/navigation";
import { columns } from "./_components/Columns";
import { getCurrentUser } from "@/lib/data/auth";
import { getBlockedUsers } from "@/lib/data/user";
import { DataTable } from "@/components/ui/data-table";

export default async function UCommunityPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const blockedUsers = await getBlockedUsers(currentUser.id);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold md:text-2xl">CommunityPage</h1>

      <DataTable
        searchKey="username"
        columns={columns}
        data={blockedUsers.map((blockedUser) => ({
          id: blockedUser.id,
          userId: blockedUser.blockedUser.id,
          username: blockedUser.blockedUser.username,
          imageUrl: blockedUser.blockedUser.imageUrl,
          createdAt: blockedUser.blockedUser.createdAt,
        }))}
      />
    </div>
  );
}
