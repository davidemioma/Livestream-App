import { notFound } from "next/navigation";
import FollowBtn from "./_components/FollowBtn";
import { isFollowingUser } from "@/lib/data/user";
import { getUserByUsername } from "@/lib/data/user";

export default async function Userpage({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(username);

  if (!user) {
    return notFound();
  }

  //Check if current user is following this user
  const isFollowing = await isFollowingUser(user.id);

  return (
    <div>
      <p>Username: {username}</p>

      <p>User ID: {user.id}</p>

      <p>Is following: {isFollowing ? "Yes" : "No"}</p>

      <FollowBtn userid={user.id} isFollowing={isFollowing} />
    </div>
  );
}
