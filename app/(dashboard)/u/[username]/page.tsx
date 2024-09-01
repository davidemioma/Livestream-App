import { getCurrentUserByUsername } from "@/lib/data/auth";

export default async function UPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const currentUser = await getCurrentUserByUsername(username);

  return <div>UPage {username}</div>;
}
