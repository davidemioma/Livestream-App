import { Suspense } from "react";
import NavBar from "./_components/navbar";
import Container from "@/components/Container";
import SideBar, { SidebarSkeleton } from "./_components/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <div className="flex h-full w-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <SideBar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
}
