import NavBar from "./_components/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <main className="h-full w-full pt-20">{children}</main>
    </>
  );
}
