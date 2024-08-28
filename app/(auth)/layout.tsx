import Logo from "./_components/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Logo />

      {children}
    </div>
  );
}
