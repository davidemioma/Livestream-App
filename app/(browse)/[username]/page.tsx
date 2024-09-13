import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/data/user";
import StreamPlayer from "@/components/stream-player";
import { isBlockedByUser, isFollowingUser } from "@/lib/data/user";

export default async function Userpage({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    return notFound();
  }

  //Check if current user is following this user
  const isFollowing = await isFollowingUser(user.id);

  //Check if current user is blocked by this user
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    return notFound();
  }

  return (
    <StreamPlayer
      user={{
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
        bio: user.bio,
      }}
      followedByCount={user._count.followedBy}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  );
}
