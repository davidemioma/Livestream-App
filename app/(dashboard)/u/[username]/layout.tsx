import NavBar from "./_components/navbar";
import { redirect } from "next/navigation";
import Sidebar from "./_components/sidebar";
import Container from "./_components/Container";
import { getCurrentUserByUsername } from "@/lib/data/auth";

export default async function CreatorLayout({
  children,
  params: { username },
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const currentUser = await getCurrentUserByUsername(username);

  if (!currentUser) {
    return redirect("/");
  }

  return (
    <>
      <NavBar />

      <div className="flex h-full w-full pt-20">
        <Sidebar />

        <Container>{children}</Container>
      </div>
    </>
  );
}
