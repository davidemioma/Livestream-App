import NavBar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Container from "./_components/Container";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
