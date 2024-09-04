import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/auth";

export default async function UCommunityPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  return <div>UCommunityPage {username}</div>;
}
