import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <div className="flex h-full w-full pt-20">
        <SideBar />

        {children}
      </div>
    </>
  );
}
