import { notFound } from "next/navigation";
import BlockBtn from "./_components/BlockBtn";
import FollowBtn from "./_components/FollowBtn";
import { getCurrentUser } from "@/lib/data/auth";
import { getUserByUsername, isUserBlocked } from "@/lib/data/user";
import { isBlockedByUser, isFollowingUser } from "@/lib/data/user";

export default async function Userpage({
  params: { username },
}: {
  params: { username: string };
}) {
  const currentUser = await getCurrentUser();

  const user = await getUserByUsername(username);

  if (!user) {
    return notFound();
  }

  //Check if current user is not the page user
  const notCurrentUser = currentUser.id !== user.id;

  //Check if current user is following this user
  const isFollowing = await isFollowingUser(user.id);

  //Check if current user is blocked by this user
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    return notFound();
  }

  // Check if current user blocked this user
  const userBlocked = await isUserBlocked(user.id);

  return (
    <div>
      <p>Username: {username}</p>

      <p>User ID: {user.id}</p>

      {notCurrentUser && <p>Is following: {isFollowing ? "Yes" : "No"}</p>}

      <div className="space-x-3">
        {notCurrentUser && (
          <FollowBtn userid={user.id} isFollowing={isFollowing} />
        )}

        {notCurrentUser && (
          <BlockBtn userid={user.id} isUserBlocked={userBlocked} />
        )}
      </div>
    </div>
  );
}
